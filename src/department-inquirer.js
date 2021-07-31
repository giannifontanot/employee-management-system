const inquirer = require('inquirer');
const validations = require('validations');
const console_table = require('console.table');
const queries = require("../../12-MySQL-Employee-Management-System/db/queries");
const chalk = require("chalk");


module.exports = {
    /**
     * Inquirer questions
     * @returns {*}
     */
    fillData: () => {
        const questions = [
            {
                name: 'department',
                type: 'input',
                message: chalk.yellow('Enter the name of the new department:'),
                validate: validations.inputLettersOnly,
            },

        ];
        return inquirer.prompt(questions);
    },
    chooseDepartment: async (departmentArray) => {
        const questions = [
            {
                name: 'department_name',
                type: 'list',
                pageSize: 20,
                loop: true,
                message: chalk.yellow('Please select a DEPARTMENT from the list:'),
                choices: departmentArray,
            },
        ];
        return await inquirer.prompt(questions);
    },
    existDepartmentInRole: async (pool, department_id) =>{
        try {
            let result = await pool.execute(queries.existDepartmentInRole(department_id));
            return result[0].length > 0;
        } catch (error) {
            console.log("error: " + error);
        }
    },
    deleteDepartment: async (pool, department_id) => {
        try {
//--------------------------------------------------------------------------------------------------------------------------
            //result:[{"fieldCount":0,"affectedRows":1,"insertId":0,"info":"","serverStatus":2,"warningStatus":0},null]
//--------------------------------------------------------------------------------------------------------------------------
            return await pool.execute(queries.deleteDepartment(department_id));
        } catch (error) {
            console.log("error: " + error);
        }
    },
    selectAll: async (pool) => {
        const [rows, fields] = await pool.execute(queries.select_department_all());
        console.table(rows);
        return '';

    },
    returnDepartmentArray: async (pool) => {
        const [rows, fields] = await pool.execute(queries.select_department_all());
        return rows;

    },
    insertNewDepartment: async (pool, department) => {
        const [rows, fields] = await pool.execute(queries.insert_new_department(department));
        return '';
    },

};
