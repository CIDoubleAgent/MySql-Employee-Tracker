const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require("mysql2/promise");
const connection = require('./db');

async function connectDb() {
    return await mysql.createConnection({
        host: "localhost",
        user: "employee_tracker",
        database: "employee_db",
        password: "root"
    });
}

async function getAllRoles() {
  const connection = await connectDb();

  const [rows] = await connection.query(
    `SELECT roles.id, 
    roles.title, 
    departments.name AS department, 
    roles.salary FROM roles
    INNER JOIN departments 
    ON roles.department_id = departments.id 
    ORDER BY id ASC`
  );

  console.table(rows);
}

async function getAllDepartments() {
    const connection = await connectDb();

    const [rows] = await connection.query(
        `SELECT * FROM departments
        ORDER BY name ASC`
    );

    console.table(rows);
}

async function getAllEmployees() {
  const connection = await connectDb();

  const [rows] = await connection.query(
    `SELECT employees.id, 
    employees.first_name, 
    employees.last_name, 
    roles.title, 
    departments.name AS department, 
    roles.salary, 
    CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employees 
    INNER JOIN roles ON employees.role_id = roles.id 
    INNER JOIN departments ON roles.department_id = departments.id 
    LEFT JOIN employees manager ON employees.manager_id = manager.id 
    ORDER BY id ASC`
  );

  console.table(rows);
}

async function addEmployee() {
  const connection = await connectDb();

  const [rows] = await connection.query(
    `SELECT * FROM roles`
  );
  
  const roleChoices = rows.map(e => {
    return {name: e.title, value: e.id}
  });

  await inquirer.prompt([
    {
      name: "newEmpFirstName",
      type: "input",
      message: "What is the employees first name?"
    },
    {
      name: "newEmpLastName",
      type: "input",
      message: "What is the employees last name?"
    },
    {
      name: "newEmpRole",
      type: "list",
      message: "What is the employee's role?",
      choices: roleChoices
    },
  ]).then ((answers) => {
    connection.query(
    `INSERT INTO employees SET ?`,
    {first_name: answers.newEmpFirstName, last_name: answers.newEmpLastName, role_id: answers.newEmpRole}
    );

    //insert function to get manager names for list and prompt for employee manager

    console.log("--Added ", answers.newEmpFirstName + " " + answers.newEmpLastName, " to the database");
  });

  // [rows] = await connection.query(`SELECT * FROM employees`);
  // const managerChoices = rows.map(e => {
  //   return {name: e.first_name + " " + e.last_name, value: e.id}
  // })

  // await inquirer.prompt([
  //   {
  //     name: "newEmpManager",
  //     type: "list",
  //     message: "Who is the employee's manager?",
  //     choices: managerChoices
  //   },
  // ])
}

async function updateEmployeeRole() {
  const connection = await connectDb();

  const [employees] = await connection.query(
    `SELECT * FROM employees`
  );

  const employeeChoices = employees.map(e => {
    return {name: e.first_name + " " + e.last_name, roleId: e.role_id, id: e.id}
  });

  await inquirer.prompt([
    {
      name: "selectEmployee",
      type: "list",
      message: "Which employee's role would you like to update?",
      choices: employeeChoices
    }
  ]).then(async (answers) => {
    const [roles] = await connection.query(
      `SELECT * FROM roles`
      );
      console.table(roles);
    
    const roleChoices = roles.map(e => {
      return {id: e.id, name: e.title}
    });

    await inquirer.prompt([
      {
        name: "newRole",
        type: "list",
        message: "Which role do you want to assign the selected employee?",
        choices: roleChoices
      }
    ]).then(async (response) => {
      const newRole = roleChoices.find((role) => {
        return role.name === response.newRole
      });

      const selectedEmployee = employeeChoices.find((employee) => {
        return employee.name === answers.selectEmployee
      });

      await connection.query(
        `UPDATE employees SET role_id=${newRole.id} WHERE id=${selectedEmployee.id};`,
        {role_id: newRole.id}
      );        
    });
  });
  
}

async function addRole() {
  const connection = await connectDb();

  const [rows] = await connection.query(
    `SELECT * FROM departments`
  );

  const departmentChoices = rows.map(e => {
    return {name: e.name, value: e.id}
  });

  await inquirer.prompt([
    {
      name: "newRoleName",
      type: "input",
      message: "What is the name of the role?"
    },
    {
      name: "newRoleSalary",
      type: "input",
      message: "What is the salary of the role?"
    },
    {
      name: "newRoleDept",
      type: "list",
      message: "Which department does the role belong to?",
      choices: departmentChoices
    },
  ]).then ((answers) => {
    connection.query(
    `INSERT INTO roles SET ?`,
    {title: answers.newRoleName, salary: answers.newRoleSalary, department_id: answers.newRoleDept}
    );
    console.log("--Added ", answers.newRoleName, " to the database");
  });
}

async function addDepartment() {
  const connection = await connectDb();

  await inquirer.prompt([
    {
      name: "newDepartment",
      type: "input",
      message: "What is the name of the department?"
    }
  ]).then (function (answer) {
    connection.query(
    `INSERT INTO departments SET ?`,
    {name: answer.newDepartment}
    );
    
    console.log("--Added ", answer.newDepartment, " to the database");
  });
}

function quitApp() {
  connection.end;
  process.exit();
}

module.exports = {
    getAllDepartments,
    getAllEmployees,
    getAllRoles,
    addEmployee,
    updateEmployeeRole,
    addRole,
    addDepartment,
    quitApp
}