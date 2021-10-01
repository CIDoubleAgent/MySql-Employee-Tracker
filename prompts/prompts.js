const chalk = require("chalk");

const startPrompt = [{
    type: "list",
    name: "options",
    message: chalk.greenBright("What would you like to do?"),
    choices: [
        {
            value: "all_employees",
            name: "View All Employees"
        },
        {
            value: "add_employee",
            name: "Add Employee"
        },
        {
            value: "update_employee_role",
            name: "Update Employee Role"
        },
        {
            value: "all_roles",
            name: "View All Roles"
        },
        {
            value: "add_role",
            name: "Add Role"
        },
        {
            value: "all_departments",
            name: "View All Departments"
        },
        {
            value: "add_department",
            name: "Add Department"
        },
        {
            value: "quit",
            name: "Quit"
        }
    ]
}];

module.exports = startPrompt