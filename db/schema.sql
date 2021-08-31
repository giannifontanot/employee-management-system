-- Drops the company_db if it exists currently --
DROP DATABASE IF EXISTS company_db;
-- Creates the "company_db" database --
CREATE DATABASE company_db;

-- Makes it so all of the following code will affect company_db --
USE company_db;

-- Creates the table "department" within company_db --
CREATE TABLE department
(
    id   int auto_increment primary key NOT NULL,
    name VARCHAR(30)                    NOT NULL
);
-- Creates the table "role" within company_db --
CREATE TABLE role
(
    id            int auto_increment NOT NULL,
    department_id int                NOT NULL,
    title         VARCHAR(30)        NOT NULL,
    salary        decimal,
    primary key (id),
    foreign key (department_id) references department(id)
);
-- Creates the table "employee" within company_db --
CREATE TABLE employee
(
    id            int auto_increment NOT NULL,
    role_id int                     NOT NULL,
    manager_id int                NOT NULL,
    first_name         VARCHAR(30)        NOT NULL,
    last_name         VARCHAR(30)        NOT NULL,
    primary key (id),
    foreign key (manager_id) references employee(id)
);