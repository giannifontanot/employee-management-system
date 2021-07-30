const tools = require('./lib/screen-tools');
const mysql2 = require('mysql2/promise');
let gMessage = '';

// Inquirer questions
const employee_inquirer = require('./src/employee-inquirer');
const main_menu_inquirer = require('./src/main-menu-inquirer');
const role_inquirer = require('./src/role-inquirer');
const department_inquirer = require('./src/department-inquirer');

// Classes
const Employee = require('./lib/Employee');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const manager_inquirer = require("./src/manager-inquirer");
const chalk = require("chalk");

// Create a pool of DB connections

// RUN FORREST, RUN!!
run = async () => {
    //Clear the console
    tools.clearPage();

    // User select an option to proceed
    let bContinue = true;

    while (bContinue) {
        const pool = await mysql2.createPool({
            host: 'localhost',
            user: 'root',
            database: 'company_db',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        // What do you want to do?
        const {option} = await main_menu_inquirer.getOption(gMessage);
        switch (option) {
            case 'View all departments': {// !OK
                let {err} = await department_inquirer.selectAll(pool);
                break;
            }
            case 'View all roles': {// !OK
                let {err} = await role_inquirer.selectAll(pool);
                break;
            }
            case 'View all employees': {// !OK
                let {err} = await employee_inquirer.selectAll(pool);
                break;
            }
            case 'Add a department': {// !OK
                let {department} = await department_inquirer.fillData();
                let {err} = await department_inquirer.insertNewDepartment(pool, department);
                break;
            }
            case 'Add a role': {// !OK
                let department_id = 0;
                let departmentArray = await department_inquirer.returnDepartmentArray(pool);
                let {title, salary, department_name} = await role_inquirer.fillData(departmentArray);
                let {err} = await role_inquirer.insertNewRole(pool, title, salary, findId(department_name, departmentArray));
                break;
            }
            case 'Add an employee': { // !OK
                let role_id = 0;
                let manager_id = 0;
                let roleArray = await role_inquirer.returnRoleArray(pool);
                let managerArray = await employee_inquirer.returnManagerArray(pool);
                let {
                    first_name,
                    last_name,
                    role_name,
                    manager_name
                } = await employee_inquirer.fillData(roleArray, managerArray);

                let {err} = await employee_inquirer.insertNewEmployee(pool, first_name, last_name, findId(role_name, roleArray), findId(manager_name, managerArray));
                break;
            }
            case 'Update an employee role': { // !OK
                let employeeArray = await employee_inquirer.returnEmployeeArray(pool);
                let {employee_name} = await employee_inquirer.chooseEmployee(employeeArray);
                let employee_id = findId(undefined, employeeArray);
                let roleArray = await role_inquirer.returnRoleArray(pool);
                let {role_name} = await employee_inquirer.chooseRoleForEmployee(employee_name, roleArray);
                let {err} = await employee_inquirer.updateEmployeeRole(pool, findId(employee_name, employeeArray), findId(role_name, roleArray));
                let {err2} = await employee_inquirer.selectAll(pool);
                break;
            }
            case 'update_employee_manager' : { // !OK
                let employeeArray = await employee_inquirer.returnEmployeeArray(pool);
                let {employee_name} = await employee_inquirer.chooseEmployee(employeeArray);
                let employee_id = findId(undefined, employeeArray);
                let managerArray = await employee_inquirer.returnManagerArray(pool);
                let {manager_name} = await employee_inquirer.chooseManagerForEmployee(employee_name, managerArray);
                let {err} = await employee_inquirer.updateEmployeeManager(pool, findId(employee_name, employeeArray), findId(manager_name, managerArray));
                let {err2} = await employee_inquirer.selectAll(pool);
                break;
            }

            case 'view_employees_by_manager' : { // !OK
                let managerArray = await employee_inquirer.returnManagerArray(pool);
                let {manager_name} = await employee_inquirer.chooseManager(managerArray);
                let {err} = await employee_inquirer.viewEmployeesByManager(pool,findId(manager_name, managerArray));
                break;

            }
            case 'view_employees_by_department' : { // !OK
                let departmentArray = await department_inquirer.returnDepartmentArray(pool);
                let {department_name} = await department_inquirer.chooseDepartment(departmentArray);
                let {err} = await employee_inquirer.viewEmployeesByDepartment(pool,findId(department_name, departmentArray));
                break;
            }

            case 'delete_employee' : { // !OK
                let employeeArray = await employee_inquirer.returnEmployeeArray(pool);
                let {employee_name} = await employee_inquirer.chooseEmployee(employeeArray);
                let {err} = await employee_inquirer.deleteEmployee(pool, findId(employee_name, employeeArray));
                break;
            }

            case 'delete_role' : { // !OK
                let roleArray = await role_inquirer.returnRoleArray(pool);
                let {role_name} = await role_inquirer.chooseRole(roleArray);
                const  bResult  = await role_inquirer.existRoleInEmployee(pool, findId(role_name, roleArray));

                if (bResult) {
                 console.log(chalk.red("You cannot delete the role "+role_name+". There are many EMPLOYEES with that" +
                     " role."));
               }else{

                let { err } = await role_inquirer.deleteRole(pool, findId(role_name, roleArray));
                console.table(err);
                }
                break;
            }

            case 'delete_department' : { // !HERE
                let departmentArray = await department_inquirer.returnDepartmentArray(pool);
                let {department_name} = await department_inquirer.chooseDepartment(departmentArray);
                const  bResult  = await department_inquirer.existDepartmentInRole(pool, findId(department_name, departmentArray));

                if (bResult) {
                    console.log(chalk.red("You cannot delete the department "+department_name+". There are many ROLES" +
                        " with" +
                        " that" +
                        " department."));
                }else{

                    let { err } = await department_inquirer.deleteDepartment(pool, findId(department_name, departmentArray));
                    console.table(err);
            // -----------------------------------------------------------------------------------------------------------------------------------











                }
                break;
            }
            case 'budget_by_department' : {
                let {department_id} = await department_inquirer.select();
                let {err} = await department_inquirer.budget('department_id');
                break;
            }
            case 'Quit': {
                bContinue = false;
                break;
            }
        }
    }
}

// RUN FORREST, RUN!!
run().then(r => {
// Read gTeam and generate html
    tools.buildHTML(gTeam);
});

/**
 * Returns the ID related to the selected userName in a binary array
 * @param userName
 * @param userArray
 * @returns {number}
 */
function findId(userName, userArray) {
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
}









