const inquirer = require('inquirer');
const chalk = require("chalk");

module.exports = {
    getOption: () => {
        const questions = [
            {
                name: 'option',
                type: 'list',
                message: chalk.yellow('What do you want to do?'),
                loop: false,
                pageSize: 20,
                choices: ['Add a department', 'Add a role', 'Add an employee', new inquirer.Separator(), 'View all departments', 'View all roles', 'View all employees', 'view_employees_by_department', 'view_employees_by_manager', new inquirer.Separator(), 'Update an employee role', 'update_employee_manager', new inquirer.Separator(), 'delete_role', 'delete_department', 'delete_employee', new inquirer.Separator(), 'budget_by_department', 'Quit'],
            },
        ];
        return inquirer.prompt(questions);
    },
};
