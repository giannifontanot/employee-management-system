const inquirer = require('inquirer');
const console_table = require('console.table');
const queries = require('../../12-MySQL-Employee-Management-System/db/queries');
const chalk = require("chalk");

module.exports = {

    fillData: (departmentArray) => {
        const questions = [
            {
                name: 'title',
                type: 'input',
                message: chalk.yellow("Enter the ROLE NAME:"),
                // validate: validateSchoolResponse,
            },
            {
                name: 'salary',
                type: 'input',
                message: chalk.yellow("Enter a SALARY:"),
                // validate: validateSchoolResponse,
            },
            {
                name: 'department_name',
                type: 'list',
                message: chalk.yellow('Please select a DEPARTMENT from the list:'),
                loop: true,
                pageSize: 20,
                choices: departmentArray,
            },

        ];
        return inquirer.prompt(questions);
    },
    selectAll: async (pool) => {
        const [rows, fields] = await pool.execute(queries.select_role_all());
        console.table(rows);
        return '';

    },
    insertNewRole: async (pool, title, salary, department_id) => {
        return await pool.execute(queries.insert_new_role(title, salary, department_id));
    },
};
