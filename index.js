const inquirer = require("inquirer");
const prompt = inquirer.createPromptModule();
const startPrompt = require("./prompts/prompts.js");
const queryHandlers = require("./db/queries.js");

function handlePrompts() {
    prompt(startPrompt).then(async(responseData) => {
        console.table(responseData)
    
        switch(responseData.options) {
            case "all_departments": 
                await queryHandlers.getAllDepartments();
                handlePrompts();
                break;
            case "all_roles": 
                await queryHandlers.getAllRoles();
                handlePrompts();
                break;
            case "all_employees": 
                await queryHandlers.getAllEmployees();
                handlePrompts();
                break;
        }
    })
}

handlePrompts();

module.exports = handlePrompts