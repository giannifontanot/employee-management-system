
const inquirer = require('inquirer');
const console_table = require('console.table');
const queries = require('../../12-MySQL-Employee-Management-System/db/queries');

module.exports = {

    fillData: () => {
        const questions = [
            {
                name: 'school',
                type: 'input',
                message: 'Enter the school name:',
                // validate: validateSchoolResponse,
            },

        ];
        return inquirer.prompt(questions);
    },
    selectAll: async (pool) => {
        const [rows, fields] = await pool.execute(queries.select_employee_all());
        console.table(rows);
        return '';

    },
};
