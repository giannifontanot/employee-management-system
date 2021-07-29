const inquirer = require('inquirer');
const console_table = require('console.table');
const queries = require("../../12-MySQL-Employee-Management-System/db/queries");

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
                message: 'Enter the name of the new department:',
                validate: validateNewDepartment,
            },

        ];
        return inquirer.prompt(questions);
    },
    selectAll: async (pool) => {
        const [rows, fields] = await pool.execute(queries.select_department_all());
        console.table(rows);
        return '';

    },
    returnDepartmentArray: async (pool) => {
        const [ rows , fields] = await pool.execute(queries.select_department_all());
         console.log("rows: " + JSON.stringify(rows));
        return rows;

    },
    insertNewDepartment: async (pool, department) => {
        const [rows, fields] = await pool.execute(queries.insert_new_department(department));
        console.table(rows);
        return '';
    },
    method3: () => {

    },
    checkValidateGitHubResponse: (name) => {
        return validateNewDepartment(name);
    },
}
;

const validateNewDepartment = name => {
    //validate null or undefined
    const message = "Please enter a valid department name. ";
    if (name == null) {
        return message + "Your input cannot be null.";
    }
    //validate blank string
    if (!name.length) {
        return message + "Your input cannot be empty.";
    }
    //valid name
    return true;
};