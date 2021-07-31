/**
 * Inquirer questions and
 * validations for the
 * class INTERN
 */
const inquirer = require('inquirer');
const validations = require('./validations');


module.exports = {
    /**
     * Inquirer questions
     * @returns {*}
     */
    fillData: () => {
        const questions = [
            {
                name: 'school',
                type: 'input',
                message: 'Enter the school name:',
                validate: validations.inputLettersOnly,
            },

        ];
        return inquirer.prompt(questions);
    },
    /**
     * Method used in Jest
     * @param school
     * @returns {string|boolean}
     */
    checkValidateSchoolResponse: (school) => {
        return validateSchoolResponse(school);
    },
};
