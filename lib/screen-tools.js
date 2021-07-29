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

    printScreen: () => {

    },
};