const cTable = require('console.table');
const mysql = require("mysql2/promise");

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
    'SELECT * FROM `roles`'
  );
  console.table(rows);
}

async function getAllDepartments() {
    const connection = await connectDb();
    const [rows, fields] = await connection.query(
        'SELECT * FROM `departments`'
    );
    console.table(rows);
}

async function getAllEmployees() {
  const connection = await connectDb();
  const [rows, fields] = await connection.query(
    'SELECT * FROM `employees`',
  );
  console.table(rows);
}

module.exports = {
    getAllDepartments,
    getAllEmployees,
    getAllRoles
}