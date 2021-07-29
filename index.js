const tools = require('./lib/screen-tools');
const mysql2 = require('mysql2/promise');

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

        // What else do you want to do?
        const {option} = await main_menu_inquirer.getOption();
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
                let departmentArray = await department_inquirer.returnDepartmentArray(pool);
                let {title, salary, department_name} = await role_inquirer.fillData(departmentArray);
                let department_id = 0;
                departmentArray.every((element, index, array) => {
                    const {id, name} = element;
                    if (department_name === name) {
                        department_id = id;
                        return false;
                    }
                    return true;
                });

                let { err } = await role_inquirer.insertNewRole(pool, title, salary, department_id);
                break;
            // -----------------------------------------------------------------------------------------------------------------------------------
            }
            case 'Add an employee': { // !HERE
                let {role_id} = await role_inquirer.select('role_id');
                let {manager_id} = await manager_inquirer.select('manager_id');
                let {first_name, last_name} = await employee_inquirer.fillData();
                let {err} = await employee_inquirer.insertNewEmployee(first_name, last_name, role_id, manager_id);
                break;
            }
            case 'Update an employee role': {
                let {employee_id} = await employee_inquirer.select();
                let {role_id} = await role_inquirer.select('role_id');
                let {err} = await employee_inquirer.update('employee_id', 'role_id');
                break;
            }

            case 'view_employees_by_manager' : {
                let {manager_id} = await manager_inquirer.select();
                let {err} = await employee_inquirer.select('manager_id');
                break;
            }
            case 'view_employees_by_department' : {
                let {department_id} = await department_inquirer.select();
                let {err} = await employee_inquirer.select('department_id');
                break;
            }
            case 'update_employee_manager' : {
                let {employee_id} = await employee_inquirer.select();
                let {manager_id} = await manager_inquirer.select('manager_id');
                let {err} = await employee_inquirer.update('employee_id', 'manager_id');
                break;
            }
            case 'delete_employee' : {
                let {employee_id} = await employee_inquirer.select();
                let {err} = await employee_inquirer.delete('employee_id');
                break;
            }

            case 'delete_role' : {
                let {role_id} = await role_inquirer.select();
                let {err} = await role_inquirer.delete('role_id');
                break;
            }
            case 'delete_department' : {
                let {department_id} = await department_inquirer.select();
                let {err} = await department_inquirer.delete('department_id');
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














