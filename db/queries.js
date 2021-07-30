module.exports = {
    select_role_all: () => {
        return `SELECT company_db.role.id         as Role_Id,
                       company_db.role.title      as Role,
                       company_db.department.name as Department,
                       company_db
                           .role.salary           as Salary
                FROM company_db.role,
                     company_db.department
                where company_db.role.department_id = company_db.department.id`;
    },
    select_department_all: () => {
        return `SELECT id, name
                FROM company_db.department`;
    },
    select_employee_all: () => {
        return `SELECT employeeTable.id                                               as Employee_Id,
                       CONCAT(employeeTable.first_name, " ", employeeTable.last_name) as Employee,
                       role.title                                                     as Role,
                       CONCAT(managerTable.first_name, " ", managerTable.last_name)   as Manager
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
                FROM company_db.employee`;

    },
    select_role_list: () => {
        return `SELECT id, title as name
                FROM company_db.role`;
    },
};