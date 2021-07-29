/**
 * Inquirer questions and
 * validations for the
 * class INTERN
 */
const inquirer = require('inquirer');

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
                validate: validateSchoolResponse,
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
        //console.log("school: >" + school + "<");
        return validateSchoolResponse(school);
    },
};

const validateSchoolResponse = school => {
    //validate null or undefined
    const message = "Please enter a valid school. "
    if (school == null) {
        return message + "Cannot be null.";
    }
    //validate blank string
    if (!school.length) {
        return message + "Cannot be empty.";
    }
    //validate not numbers
    let pattern = new RegExp(/[^0-9]/g);
    if (!pattern.test(school)) {
        return message + "No numbers in school accepted.";
    }
    //validate not blank space
    pattern = new RegExp(/^[^\s]+(\s+[^\s]+)*$/g);
    if (!pattern.test(school)) {
        return message + "No blank spaces at the beginning or end.";
    }
    //valid name
    return true;
};