/**
 *
 * Methods to paint in screen
 */
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs');


module.exports = {
    /**
     * Resets screen
     */
    clearPage: () => {
        clear();

        console.log(
            chalk.yellow(
                figlet.textSync('Employee Manager', {
                    horizontalLayout: 'default',
                    verticalLayout: 'full',
                    whitespaceBreak: true,
                    width: 80
                })
            )
        );
    },

/**
 * Returns the ID related to the selected userName in a binary array
 * @param userName
 * @param userArray
 * @returns {number}
 */
    findId: (userName, userArray) => {
        let user_id = 0;
        userArray.every((element, index, array) => {

            const {id, name} = element;

            if (userName === name) {
                user_id = id;
                return false;
            }
            return true;
        });
        return user_id;
    },
};



