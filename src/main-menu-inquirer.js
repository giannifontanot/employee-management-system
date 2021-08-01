const inquirer = require('inquirer');
const chalk = require("chalk");
const tools = require("../lib/tools");

module.exports = {
    getOption: () => {
        const questions = [
            {
                name: 'option',
                type: 'rawlist',
                message: chalk.yellow('What do you want to do?'),
                loop: false,
                pageSize: 20,
                choices: ['Add a department', 
                          'Add a role', 
                          'Add an employee', 
                          new inquirer.Separator(), 
                          'View all departments', 
                          'View all roles', 
                          'View all employees', 
                          'View employees by department', 
                          'View employees by manager', 
                          new inquirer.Separator(), 
                          'Update an employee role', 
                          'Update employee manager', 
                          new inquirer.Separator(), 
                          'Delete role', 
                          'Delete department', 
                          'Delete employee', 
                          new inquirer.Separator(), 
                          'Budget by department', 
                          'Quit'],
            },
        ];
console.log(chalk.gray('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'));
        return inquirer.prompt(questions);
    },
};
