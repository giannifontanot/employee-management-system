
const inquirer = require('inquirer');
const console_table = require('console.table');
const queries = require('../../12-MySQL-Employee-Management-System/db/queries');
const chalk = require("chalk");

module.exports = {

    fillData: async (roleArray, managerArray) => {
        const questions = [
            {
                name: 'first_name',
                type: 'input',
                message: chalk.yellow('Enter the first name:'),
                // validate: validateSchoolResponse,
            },
            {
                name: 'last_name',
                type: 'input',
                message: chalk.yellow('Enter the last name:'),
                // validate: validateSchoolResponse,
            },
            {
                name: 'title',
                type: 'list',
                pageSize: 20,
                loop: false,
                message: chalk.yellow('Please select a ROLE from the list:'),
                choices: roleArray,
            },
            {
                name: 'manager_name',
                type: 'list',
                pageSize: 20,
                loop: false,
                message: chalk.yellow('Please select a MANAGER from the list:'),
                choices: managerArray,
            },

        ];
        return await inquirer.prompt(questions);
    },
    selectAll: async (pool) => {
        const [rows, fields] = await pool.execute(queries.select_employee_all());

        console.table(rows);
        return '';

    },
    returnManagerArray: async (pool) => {
        const [ rows , fields] = await pool.execute(queries.select_manager_list());

        return rows;

    },
    insertNewEmployee: async (pool, first_name, last_name, role_id, manager_id) => {
        const [rows, fields] = await pool.execute(queries.insert_new_employee(first_name, last_name, role_id, manager_id));
        return '';
    },
};
