module.exports = {
    return_role_table: () => {
        return `SELECT company_db.role.id         as ID,
                       company_db.role.title      as ROLE,
                       company_db.department.name as DEPARTMENT,
                       company_db
                           .role.salary           as SALARY
                FROM company_db.role,
                     company_db.department
                where company_db.role.department_id = company_db.department.id`;
    },
    select_department_all: () => {
        return `SELECT id, name
                FROM company_db.department`;
    },
    return_department_table: () => {
        return `SELECT id as ID, name as DEPARTMENT
                FROM company_db.department`;
    },
    return_employee_table: () => {
        return `SELECT employeeTable.id                                               as ID,
                       CONCAT(employeeTable.first_name, " ", employeeTable.last_name) as EMPLOYEE,
                       role.title                                                     as ROLE,
                       CONCAT(managerTable.first_name, " ", managerTable.last_name)   as MANAGER
                from company_db.employee as employeeTable,
                     company_db.role,
                     company_db.employee as managerTable
                where employeeTable.role_id = role.id
                  and managerTable.id = employeeTable.manager_id`;
    },
    insert_new_department: (department) => {
        return `insert into company_db.department (name)
                values ('${department}');`;
    },
    insert_new_role: (title, salary, department_id) => {

        return `insert into company_db.role (title, salary, department_id)
                values ('${title}', ${salary}, ${department_id});`;
    },
    insert_new_employee: (first_name, last_name, role_id, manager_id) => {

        return `insert into company_db.employee (first_name, last_name, role_id, manager_id)
                values ('${first_name}', '${last_name}', ${role_id}, ${manager_id})`;
    },
    select_manager_list: () => {
        return `SELECT id, concat(first_name, " ", last_name) as name
                FROM company_db.employee
                where employee.id = employee.manager_id`;

    },
    select_role_list: () => {
        return `SELECT id, title as name
                FROM company_db.role`;
    },
    select_employee_list: () => {
        return `SELECT id, concat(first_name, " ", last_name) as name
                FROM company_db.employee`;
    },
    updateEmployeeRole: (employee_id, role_id) => {
        return `UPDATE company_db.employee
                SET role_id=${role_id}
                WHERE id = ${employee_id}`;
    },
    updateEmployeeManager: (employee_id, manager_id) => {
        return `UPDATE company_db.employee
                SET manager_id=${manager_id}
                WHERE id = ${employee_id}`;
    },
    deleteEmployee: (employee_id) => {
        return `DELETE
                FROM company_db.employee
                WHERE id = ${employee_id}`;
    },
    deleteRole: (role_id) => {
        return `DELETE
                FROM company_db.role
                WHERE id = ${role_id}`;
    },
    viewEmployeesByManager: (manager_id) => {
        return `SELECT id, concat(first_name, " ", last_name) as name
                FROM company_db.employee
                WHERE employee.manager_id = ${manager_id}`;
    },
    viewEmployeesByDepartment: (department_id) => {
        return `SELECT employee.id,
                       concat(employee.first_name, " ", employee.last_name) as name,
                       department.name                                      as department
                FROM company_db.employee,
                     company_db.role,
                     company_db.department
                WHERE company_db.employee.role_id = company_db.role.id
                  AND company_db.role.department_id = company_db.department.id
                  AND role.department_id = ${department_id}`;
    },
    existRoleInEmployee: (role_id) => {
        return `SELECT company_db.role.id
                FROM company_db.employee,
                     company_db.role
                WHERE company_db.role.id = company_db.employee.role_id
                  AND company_db.role.id = ${role_id}`;
    },
    existDepartmentInRole: (department_id) => {
        return `SELECT company_db.department.id, company_db.department.name
                FROM company_db.department,
                     company_db.role
                WHERE company_db.department.id = company_db.role.department_id
                  AND company_db.department.id = ${department_id}`;
    },
    deleteDepartment: (department_id) => {
        return `DELETE
                FROM company_db.department
                WHERE id = ${department_id}`;
    },
    getBudget: (department_id) => {
        return `SELECT SUM(role.salary) as budget
                FROM company_db.role
                WHERE role.department_id = ${department_id}`;
    },

}
12














































