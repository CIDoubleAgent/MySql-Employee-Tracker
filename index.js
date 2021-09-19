const inquirer = require("inquirer");
const mysql = require("mysql2");
const prompt = inquirer.createPromptModule();
const startPrompt = require("./prompts/prompts.js");
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    user: "employee_tracker",
    database: "employee_db",
    password: "root"
});

prompt(startPrompt).then((responseData) => {
    console.table(responseData)
})