const inquirer = require("inquirer");
const prompt = inquirer.createPromptModule();
const startPrompt = require("./prompts/prompts.js");
const queryHandlers = require("./db/queries.js");

function handlePrompts() {
    prompt(startPrompt).then(async(responseData) => {
    
        switch(responseData.options) {
            case "all_employees": 
                await queryHandlers.getAllEmployees();
                handlePrompts();
                break;
            case "all_roles": 
                await queryHandlers.getAllRoles();
                handlePrompts();
                break;
            case "all_departments": 
                await queryHandlers.getAllDepartments();
                handlePrompts();
                break;
            case "add_department":
                await queryHandlers.addDepartment();
                handlePrompts();
                break;
            case "add_role":
                await queryHandlers.addRole();
                handlePrompts();
                break;
            case "add_employee":
                await queryHandlers.addEmployee();
                handlePrompts();
                break;
            case "update_employee_role":
                await queryHandlers.updateEmployeeRole();
                handlePrompts();
                break;
            case "quit":
                queryHandlers.quitApp()
                break;
        }
    })
}

handlePrompts();

module.exports = handlePrompts