const startPrompt = [{
    type: "list",
    name: "options",
    message: "Please select an option",
    choices: [
        {
            value: "all_departments",
            name: "View all departments"
        },
        {
            value: "all_roles",
            name: "View all roles"
        },
        {
            value: "all_employees",
            name: "View all employees"
        },
        {
            value: "add_department",
            name: "Add a new department"
        },
        {
            value: "add_role",
            name: "Add a new role"
        },
        {
            value: "add_employee",
            name: "Add a new employee"
        },
        {
            value: "update_employee_role",
            name: "Update an employee role"
        },
    ]
}];

module.exports = startPrompt