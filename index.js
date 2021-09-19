const inquirer = require("inquirer");
const mysql = require("mysql2");
const prompt = inquirer.createPromptModule();

const connection = mysql.createConnection({
    host: "localhost",
    user: "employee_tracker",
    database: "employee_db",
    password: "root"
});
console.log(connection);

