const cTable = require('console.table');
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

function addEmployee() {

}

function updateEmployeeRole() {

}

function addRole() {

}

function addDepartment() {

}

function quitApp() {
  connection.end;
  process.exit();
}

module.exports = {
    getAllDepartments,
    getAllEmployees,
    getAllRoles,
    quitApp
}