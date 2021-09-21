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
  // Query to get all roles
  const connection = await connectDb();
  const [rows, feilds] = await connection.query(
    'SELECT * FROM `roles`'
  );
  console.table(rows);
}

async function getAllDepartments() {
    const connection = await connectDb();

    const [rows, feilds] = await connection.query(
        'SELECT * FROM `department`'
    );

    console.table(rows);
}

function getAllEmployees() {
  connection.query(
    'SELECT * FROM `employees`',
    (err, results, fields) => {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
}

module.exports = {
    getAllDepartments,
    getAllEmployees,
    getAllRoles
}