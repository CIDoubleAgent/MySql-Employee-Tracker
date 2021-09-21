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
                queryHandlers.getAllRoles();
                break;
            case "all_employees": 
                queryHandlers.getAllEmployees();
                break;
        }
    })
}

handlePrompts();

module.exports = handlePrompts