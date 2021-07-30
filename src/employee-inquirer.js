
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
                loop: true,
                message: chalk.yellow('Please select a MANAGER from the list:'),
                choices: managerArray,
            },

        ];
        return await inquirer.prompt(questions);
    },
    chooseEmployee: async (employeeArray) => {
        const questions = [
            {
                name: 'employee_name',
                type: 'list',
                pageSize: 20,
                loop: true,
                message: chalk.yellow('Please select an EMPLOYEE from the list:'),
                choices: employeeArray,
            },

        ];
        return await inquirer.prompt(questions);
    },
    chooseRoleForEmployee: async (employee_name, roleArray) => {
        const questions = [
            {
                name: 'role_name',
                type: 'list',
                pageSize: 20,
                loop: true,
                message: chalk.bgGray(employee_name) + chalk.yellow('Please select a ROLE from the list:'),
                choices: roleArray,
            },

        ];
        return await inquirer.prompt(questions);
    },
    updateEmployeeRole: async (pool, employee_id, role_id) => {
        return await pool.execute(queries.updateEmployeeRole(employee_id, role_id));
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
    returnEmployeeArray: async (pool) => {
        const [ rows , fields] = await pool.execute(queries.select_employee_list());
        return rows;
    },
};









































