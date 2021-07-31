const chalk = require("chalk");
module.exports = {
    inputLettersOnly: (name) => {
        //validate null or undefined
        const message = chalk.red("Please check the information you typed in. ");
        if (name == null) {
            return message + chalk.red("Cannot be null.");
        }
        //validate blank string
        if (!name.length) {
            return message + chalk.red("Cannot be empty.");
        }
        //validate not numbers
        let pattern = new RegExp(/[^0-9]/g);
        if (!pattern.test(name)) {
            return message + chalk.red("No numbers accepted.");
        }
        //validate not blank space
        pattern = new RegExp(/^[^\s]+(\s+[^\s]+)*$/g);
        if (!pattern.test(name)) {
            return message + chalk.red("No blank spaces at the beginning or end.");
        }
        //valid name
        return true;
    },
    inputNumbersOnly: (number) => {
        //validate null or undefined
        const message = chalk.red("Please check the information you typed in. ");
        if (number == null) {
            return message + chalk.red("Cannot be null.");
        }
        //validate blank string
        if (!number.length) {
            return message + chalk.red("Cannot be empty.");
        }
        //validate number
        if (isNaN(number)) {
            return message + chalk.red("Only numbers accepted.");
        }

        //valid number
        return true;
    },


};
