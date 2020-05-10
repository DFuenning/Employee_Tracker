use employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);


INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Sally', 'Struthers', 4, 11),
    ('Yao', 'Ming', 5, NULL),
    ('Harry', 'Potter', 2, 10),
    ('Davie', 'Crocket', 1, 10),
    ('Comrade', 'Vodka', 7, 7),
    ('Orange', 'Julius', 8, 7),
    ('Frank', 'Frick', 8, NULL),
    ('Jasmine', 'Rice', 6, 2),
    ('Krusty', 'Krab', 1, 10),
    ('Jimmie', 'Eat-World', 1, NULL),
    ('Lebrons', 'Hairline', 3, NULL),
    ('Imma', 'Stupid', 4, 11),
    ('Look', 'Overthere', 5, 2);



