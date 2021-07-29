insert into company_db.department (name) # 1
values('Production');
insert into company_db.department (name) # 2
values('Sales');
insert into company_db.department (name) # 3
values('R&D');
insert into company_db.department (name) # 4
values('HR');
insert into company_db.department (name) # 5
values('Finance');
insert into company_db.department (name) # 6
values('Marketing');
# ................................................................
insert into company_db.role (title, salary, department_id)
values('Production Manager', 100000,1);
insert into company_db.role (title, salary, department_id)
values('Sales Manager', 100000,2);
insert into company_db.role (title, salary, department_id)
values('R&D Manager', 100000,3);
insert into company_db.role (title, salary, department_id)
values('HR Manager', 100000,4);
insert into company_db.role (title, salary, department_id)
values('Finance Manager', 100000,5);
insert into company_db.role (title, salary, department_id)
values('Marketing Manager', 100000,6);
# ................................................................
insert into company_db.role (title, salary, department_id)
values('Manufacturing Engineer', 100000,1);
insert into company_db.role (title, salary, department_id)
values('Sales Representative', 100000,2);
insert into company_db.role (title, salary, department_id)
values('R&D Engineer', 100000,3);
insert into company_db.role (title, salary, department_id)
values('HR Coordinator', 100000,4);
insert into company_db.role (title, salary, department_id)
values('Accountant', 100000,5);
insert into company_db.role (title, salary, department_id)
values('Marketing Analyst', 100000,6);
# ................................................................

insert into company_db.employee (first_name, last_name, role_id, manager_id)
values('Iona', 'Mccabe', 1, 1);
insert into company_db.employee (first_name, last_name, role_id, manager_id)
values('Amina', 'Hancock', 2, 2);
insert into company_db.employee (first_name, last_name, role_id, manager_id)
values('Braiden', 'Reyna', 3, 3);
insert into company_db.employee (first_name, last_name, role_id, manager_id)
values('Jagdeep', 'Rodrigues', 4, 4);
insert into company_db.employee (first_name, last_name, role_id, manager_id)
values('Duane', 'Sinclair', 5, 5);
insert into company_db.employee (first_name, last_name, role_id, manager_id)
values('Ethan', 'Barron', 6, 6);
insert into company_db.employee (first_name, last_name, role_id, manager_id)
values('Dannielle', 'Neal', 7, 1);
insert into company_db.employee (first_name, last_name, role_id, manager_id)
values('Amit', 'Nichols', 8, 2);
insert into company_db.employee (first_name, last_name, role_id, manager_id)
values('Bret', 'Person', 9, 3);
insert into company_db.employee (first_name, last_name, role_id, manager_id)
values('Nevaeh', 'Davison', 10, 4);
insert into company_db.employee (first_name, last_name, role_id, manager_id)
values('Enid', 'Cannon', 9, 5);
insert into company_db.employee (first_name, last_name, role_id, manager_id)
values('Bailey', 'Connors', 10, 6);
