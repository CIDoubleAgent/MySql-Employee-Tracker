const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "employee_tracker",
    database: "employee_db",
    password: "root"
});

module.exports = connection;