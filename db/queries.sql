SELECT company_db.role.id,
       company_db.role.title      as Role,
       company_db.department.name as Department,
       company_db
           .role.salary           as Salary
FROM company_db.role,
     company_db.department
where company_db.role.department_id = company_db.department.id;
# -------------------------------------------
SELECT id, name
FROM company_db.department;
# --------------------------------------------
SELECT employeeTable.id                                               as id,
       CONCAT(employeeTable.first_name, " ", employeeTable.last_name) as Employee,
       role.title                                                     as role,
       CONCAT(managerTable.first_name, " ", managerTable.last_name)   as Manager
from company_db.employee as employeeTable,
     company_db.role,
     company_db.employee as managerTable
where employeeTable.role_id = role.id
  and managerTable.id = employeeTable.manager_id;
# --------------------------------------------
insert into company_db.department (name)
values ('Production');
# --------------------------------------------
insert into company_db.role (title, salary, department_id)
values ('Manufacturing Engineer', 100000, 1);
# --------------------------------------------
SELECT id, name
FROM company_db.department;
# --------------------------------------------
SELECT id, CONCAT("'",title,"'") as title
FROM company_db.role
order by id;
# --------------------------------------------
SELECT id, concat(first_name, " ", last_name) as name
FROM company_db.employee
where employee.id = employee.manager_id

