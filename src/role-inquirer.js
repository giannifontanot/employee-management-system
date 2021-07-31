const inquirer = require('inquirer');
const console_table = require('console.table');
const validations = require('./validations');
const queries = require('../../12-MySQL-Employee-Management-System/db/queries');
const chalk = require("chalk");

module.exports = {

    fillData: (departmentArray) => {
        const questions = [
            {
                name: 'title',
                type: 'input',
                message: chalk.yellow("Enter the ROLE NAME:"),
                validate: validations.inputLettersOnly,
            },
            {
                name: 'salary',
                type: 'input',
                message: chalk.yellow("Enter a SALARY:"),
                validate: validations.inputNumbersOnly,
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
    chooseRole: async (roleArray) => {
        const questions = [
            {
                name: 'role_name',
                type: 'list',
                pageSize: 20,
                loop: true,
                message: chalk.yellow('Please select a ROLE from the list:'),
                choices: roleArray,
            },
        ];
        return await inquirer.prompt(questions);
    },
    existRoleInEmployee: async (pool, role_id) => {
        try {
            let result = await pool.execute(queries.existRoleInEmployee(role_id));

            if (result[0].length > 0) {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.log("error: " + error);
        }
    },

    deleteRole: async (pool, role_id) => {
        try {
//--------------------------------------------------------------------------------------------------------------------------
            //result:[{"fieldCount":0,"affectedRows":1,"insertId":0,"info":"","serverStatus":2,"warningStatus":0},null]
//--------------------------------------------------------------------------------------------------------------------------
            return await pool.execute(queries.deleteRole(role_id));
        } catch (error) {
            console.log("error: " + error);
        }
    },
    selectAll: async (pool) => {
        const [rows, fields] = await pool.execute(queries.select_role_all());
        console.table(rows);
        return '';

    },
    insertNewRole: async (pool, title, salary, department_id) => {
        return await pool.execute(queries.insert_new_role(title, salary, department_id));
    },
    returnRoleArray: async (pool) => {
        const [rows, fields] = await pool.execute(queries.select_role_list());
        return rows;

    },
    getBudget: async (pool, department_id) => {
        const result = await pool.execute(queries.getBudget(department_id));
        return result[0][0].budget;

    },

};
