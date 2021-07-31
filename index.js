const tools = require('./lib/tools');
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
                let {err} = await role_inquirer.insertNewRole(pool, title, salary, tools.findId(department_name, departmentArray));
                break;
            }
            case 'Add an employee': { // !OK
                let role_id = 0;
                let manager_id = 0;
                let roleArray = await role_inquirer.returnRoleArray(pool);
                let managerArray = await employee_inquirer.returnManagerArray(pool);
                let {first_name,
                    last_name,
                    role_name,
                    manager_name
                } = await employee_inquirer.fillData(roleArray, managerArray);

                let {err} = await employee_inquirer.insertNewEmployee(pool,  first_name ,  last_name , tools.findId( role_name ,  roleArray ), tools.findId(manager_name, managerArray));

                 console.log("role_name: " + role_name);

                break;

            }
            case 'Update an employee role': { // !OK
                let employeeArray = await employee_inquirer.returnEmployeeArray(pool);
                let {employee_name} = await employee_inquirer.chooseEmployee(employeeArray);
                let employee_id = tools.findId(undefined, employeeArray);
                let roleArray = await role_inquirer.returnRoleArray(pool);
                let {role_name} = await employee_inquirer.chooseRoleForEmployee(employee_name, roleArray);
                let {err} = await employee_inquirer.updateEmployeeRole(pool, tools.findId(employee_name, employeeArray), tools.findId(role_name, roleArray));
                let {err2} = await employee_inquirer.selectAll(pool);
                break;
            }
            case 'update_employee_manager' : { // !OK
                let employeeArray = await employee_inquirer.returnEmployeeArray(pool);
                let {employee_name} = await employee_inquirer.chooseEmployee(employeeArray);
                let employee_id = tools.findId(undefined, employeeArray);
                let managerArray = await employee_inquirer.returnManagerArray(pool);
                let {manager_name} = await employee_inquirer.chooseManagerForEmployee(employee_name, managerArray);
                let {err} = await employee_inquirer.updateEmployeeManager(pool, tools.findId(employee_name, employeeArray), tools.findId(manager_name, managerArray));
                let {err2} = await employee_inquirer.selectAll(pool);
                break;
            }

            case 'view_employees_by_manager' : { // !OK
                let managerArray = await employee_inquirer.returnManagerArray(pool);
                let {manager_name} = await employee_inquirer.chooseManager(managerArray);
                let {err} = await employee_inquirer.viewEmployeesByManager(pool, tools.findId(manager_name, managerArray));
                break;

            }
            case 'view_employees_by_department' : { // !OK
                let departmentArray = await department_inquirer.returnDepartmentArray(pool);
                let {department_name} = await department_inquirer.chooseDepartment(departmentArray);
                let {err} = await employee_inquirer.viewEmployeesByDepartment(pool, tools.findId(department_name, departmentArray));
                break;
            }

            case 'delete_employee' : { // !OK
                let employeeArray = await employee_inquirer.returnEmployeeArray(pool);
                let {employee_name} = await employee_inquirer.chooseEmployee(employeeArray);
                let {err} = await employee_inquirer.deleteEmployee(pool, tools.findId(employee_name, employeeArray));
                break;
            }

            case 'delete_role' : { // !OK
                let roleArray = await role_inquirer.returnRoleArray(pool);
                let {role_name} = await role_inquirer.chooseRole(roleArray);
                const bResult = await role_inquirer.existRoleInEmployee(pool, tools.findId(role_name, roleArray));

                if (bResult) {
                    console.log(chalk.red("You cannot delete the role " + role_name + ". There are many EMPLOYEES with that" +
                        " role."));
                } else {

                    let {err} = await role_inquirer.deleteRole(pool, tools.findId(role_name, roleArray));
                    console.table(err);
                }
                break;
            }

            case 'delete_department' : { // !HERE
                let departmentArray = await department_inquirer.returnDepartmentArray(pool);
                let {department_name} = await department_inquirer.chooseDepartment(departmentArray);
                const bResult = await department_inquirer.existDepartmentInRole(pool, tools.findId(department_name, departmentArray));

                if (bResult) {
                    console.log(chalk.red("You cannot delete the department " + department_name + ". There are many ROLES" +
                        " with" +
                        " that" +
                        " department."));
                } else {

                    let {err} = await department_inquirer.deleteDepartment(pool, tools.findId(department_name, departmentArray));
                    console.table(err);
                    // -----------------------------------------------------------------------------------------------------------------------------------


                }
                break;
            }
            case 'budget_by_department' : {
                let departmentArray = await department_inquirer.returnDepartmentArray(pool);
                let {department_name} = await department_inquirer.chooseDepartment(departmentArray);
                let  budget  = await role_inquirer.getBudget(pool,tools.findId(department_name,departmentArray));
                const sDepartment = chalk.bgGray(`${department_name} department`);
                console.log(chalk.blue(`The budget of the ${sDepartment} is $${new Intl.NumberFormat().format(budget)}.00`));
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
console.log('THE END');
});








