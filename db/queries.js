const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require("mysql2/promise");
const handlePrompts = require('..');
const startPrompt = require('../prompts/prompts');
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
  const [rows, fields] = await connection.query(
    `SELECT roles.id, 
    roles.title, 
    departments.name AS department, 
    roles.salary FROM roles
    INNER JOIN departments 
    ON roles.department_id = departments.id`
  );
  console.table(rows);
}

async function getAllDepartments() {
    const connection = await connectDb();
    const [rows, fields] = await connection.query(
        `SELECT * FROM departments
        ORDER BY name ASC`
    );
    console.table(rows);
}

async function getAllEmployees() {
  const connection = await connectDb();
  const [rows, fields] = await connection.query(
    `SELECT employees.id, 
    employees.first_name, 
    employees.last_name, 
    roles.title, 
    departments.name AS department, 
    roles.salary, 
    CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employees 
    INNER JOIN roles ON employees.role_id = roles.id 
    INNER JOIN departments ON roles.department_id = departments.id 
    LEFT JOIN employees manager ON employees.manager_id = manager.id`
  );
  console.table(rows);
}

async function addEmployee() {
  const connection = await connectDb();
  const [rows, fields] = await connection.query(
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
      message: "Which department does the role belong to?",
      choices: roleChoices
    },
  ]).then ((answers) => {
    const query = connection.query(
    `INSERT INTO employees SET ?`,
    {first_name: answers.newEmpFirstName, last_name: answers.newEmpLastName, role_id: answers.newEmpRole}
    );
    console.log("Added new employee to the database");
  });
}


function updateEmployeeRole() {

}

async function addRole() {
  const connection = await connectDb();
  const [rows, fields] = await connection.query(
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
    const query = connection.query(
    `INSERT INTO roles SET ?`,
    {title: answers.newRoleName, salary: answers.newRoleSalary, department_id: answers.newRoleDept}
    );
    console.log("Added new role to the database");
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
    const query = connection.query(
    `INSERT INTO departments SET ?`,
    {name: answer.newDepartment}
    );
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