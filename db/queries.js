let select_role = `SELECT company_db.role.id,
       company_db.role.title      as Role,
       company_db.department.name as Department,
       company_db
           .role.salary           as Salary
FROM company_db.role,
     company_db.department
where company_db.role.department_id = company_db.department.id`;