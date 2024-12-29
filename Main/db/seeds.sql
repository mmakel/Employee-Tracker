INSERT INTO departments (department_name)
VALUES ('Research and Design'),
       ('Finance'),
       ('Legal'),
       ('Human Resources'),
       ('Suffering');

INSERT INTO roles (title, salary, department_id)
VALUES ('Lead Designer', 100000, 1),
       ('Designer', 80000, 1),
       ('Lead Accountant', 95000, 2),
       ('Accountant', 75000, 2),
       ('Lawyer', 120000, 3),
       ('Paralegal', 60000, 3),
       ('HR Director', 110000, 4),
       ('HR Specialist', 75000, 4),
       ('The Struggler', 10, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Johnson', 'Johnson', 1, NULL),
       ('Arnorl', 'Palmer', 2, 1),
       ('Shirley', 'Temple', 2, 1),
       ('Money', 'Bags', 3, NULL),
       ('Coin', 'Bags', 4, 4),
       ('Phoenix', 'Wright', 5, NULL),
       ('Miles', 'Edgeworth', 5, NULL),
       ('Maya', 'Fey', 6, 6),
       ('Trucy', 'Wright', 6, 6),
       ('Kay', 'Faraday', 6, 7),
       ('My', 'Dad', 7, NULL),
       ('Joe', 'Schmoe', 8, 7),
       ('Mitchell', 'Lemieux', 9, 8);

