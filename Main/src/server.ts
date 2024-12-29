import express from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';
import inquirer from 'inquirer';

await connectToDb();

const PORT = 5432;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ['View all employees', 'View all employees by department', 'View all roles', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit'],
        },
    ])
    .then((response) => {
        switch (response.action) {
            case 'View all employees':
                {
                    app.get('/api/employees', (_req, res) => {
                        const sql = `SELECT * FROM employees`;
                        
                        pool.query(sql, (err: Error, result: QueryResult) => {
                            if (err) {
                            res.status(500).json({ error: err.message });
                            return;
                            }
                            const { rows } = result;
                            res.json({
                            message: 'success',
                            data: rows,
                            });
                        });
                    });
                    break;
                }
            case 'View all employees by department':
                {
                    inquirer.prompt([
                        {
                            type: 'input',
                            message: 'What is the name of the department?',
                            name: 'department',
                        },
                    ])
                    .then((response) => {
                        app.get('/api/employees/department/:department', (req, res) => {
                            req = response;
                            const department = req.body;
                            const sql = `SELECT * FROM employees WHERE department = $1`;
                          
                            pool.query(sql, [department], (err: Error, result: QueryResult) => {
                                if (err) {
                                res.status(500).json({ error: err.message });
                                return;
                                }
                                const { rows } = result;
                                res.json({
                                message: 'success',
                                data: rows,
                                });
                            });
                        });
                    });
                    break;
                }
            case 'View all roles':
                {
                    app.get('/api/roles', (_req, res) => {
                        const sql = `SELECT * FROM roles`;
                        pool.query(sql, (err: Error, result: QueryResult) => {
                            if (err) {
                            res.status(500).json({ error: err.message });
                            return;
                            }
                            const { rows } = result;
                            res.json({
                            message: 'success',
                            data: rows,
                            });
                        });
                    });
                    break;
                }
            case 'Add a department':
                {
                    inquirer.prompt([
                        {
                            type: 'input',
                            message: 'What is the name of the department?',
                            name: 'name',
                        },
                    ])
                    .then((response) => {
                        app.post('/api/departments', (req, res) => {
                            req = response;
                            const { name } = req.body;
                            const sql = `INSERT INTO departments (name) VALUES ($1) RETURNING *`;
                            const values = [name];
                          
                            pool.query(sql, values, (err: Error, result: QueryResult) => {
                                if (err) {
                                res.status(500).json({ error: err.message });
                                return;
                                }
                                const { rows } = result;
                                res.json({
                                message: 'success',
                                data: rows[0],
                                });
                            });
                        });
                    });
                    break;
                }
            case 'Add a role':
                {
                    inquirer.prompt([
                        {
                            type: 'input',
                            message: 'What is the title of the role?',
                            name: 'title',
                        },
                        {
                            type: 'input',
                            message: 'What is the salary of the role?',
                            name: 'salary',
                        },
                    ])
                    .then((response) => {
                        app.post('/api/roles', (req, res) => {
                            req = response;
                            const { title, salary } = req.body;
                            const sql = `INSERT INTO roles (title, salary) VALUES ($1, $2) RETURNING *`;
                            const values = [title, salary];
                          
                            pool.query(sql, values, (err: Error, result: QueryResult) => {
                                if (err) {
                                res.status(500).json({ error: err.message });
                                return;
                                }
                                const { rows } = result;
                                res.json({
                                message: 'success',
                                data: rows[0],
                                });
                            });
                        });
                    });
                    break;
                }
            case 'Add an employee':
                {
                    inquirer.prompt([
                        {
                            type: 'input',
                            message: 'What is the name of the employee?',
                            name: 'name',
                        },
                        {
                            type: 'input',
                            message: 'What is the department of the employee?',
                            name: 'department',
                        },
                        {
                            type: 'input',
                            message: 'What is the salary of the employee?',
                            name: 'salary',
                        },
                    ])
                    .then((response) => {
                        app.post('/api/employees', (req, res) => {
                            req = response;
                            const { name, department, salary } = req.body;
                            const sql = `INSERT INTO employees (name, department, salary) VALUES ($1, $2, $3) RETURNING *`;
                            const values = [name, department, salary];
                          
                            pool.query(sql, values, (err: Error, result: QueryResult) => {
                                if (err) {
                                res.status(500).json({ error: err.message });
                                return;
                                }
                                const { rows } = result;
                                res.json({
                                message: 'success',
                                data: rows[0],
                                });
                            });
                        });
                    });
                    break;
                }
            case 'Update an employee role':
                {
                    inquirer.prompt([
                        {
                            type: 'input',
                            message: 'What is the id of the employee?',
                            name: 'id',
                        },
                        {
                            type: 'input',
                            message: 'What is the role of the employee?',
                            name: 'role',
                        },
                    ])
                    .then((response) => {
                        app.put('/api/employees/:id', (req, res) => {
                            req = response;
                            const id = parseInt(response.id);
                            const { role } = req.body;
                            const sql = `UPDATE employees SET role = $1 WHERE id = $2 RETURNING *`;
                            const values = [role, id];
                          
                            pool.query(sql, values, (err: Error, result: QueryResult) => {
                                if (err) {
                                res.status(500).json({ error: err.message });
                                return;
                                }
                                const { rows } = result;
                                res.json({
                                message: 'success',
                                data: rows[0],
                                });
                            });
                        });
                    });
                    break;
                }
            case 'Quit':
                console.log('Goodbye!');
                break;
    }});
});




// GET all employees


//GET all employees by department
/*app.get('/api/employees/department/:department', (req, res) => {
    const department = req.params.department;
    const sql = `SELECT * FROM employees WHERE department = $1`;
  
    pool.query(sql, [department], (err: Error, result: QueryResult) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        const { rows } = result;
        res.json({
        message: 'success',
        data: rows,
        });
    });
});

//GET all roles
app.get('/api/roles', (_req, res) => {
    const sql = `SELECT * FROM roles`;
    
    pool.query(sql, (err: Error, result: QueryResult) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        const { rows } = result;
        res.json({
        message: 'success',
        data: rows,
        });
    });
});

// GET an employee by id
app.get('/api/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sql = `SELECT * FROM employees WHERE id = $1`;
  
    pool.query(sql, [id], (err: Error, result: QueryResult) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        const { rows } = result;
        res.json({
        message: 'success',
        data: rows,
        });
    });
});

// POST a new department
app.post('/api/departments', (req, res) => {
    const { name } = req.body;
    const sql = `INSERT INTO departments (name) VALUES ($1) RETURNING *`;
    const values = [name];
  
    pool.query(sql, values, (err: Error, result: QueryResult) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        const { rows } = result;
        res.json({
        message: 'success',
        data: rows[0],
        });
    });
});

// POST a new role
app.post('/api/roles', (req, res) => {
    const { title, salary } = req.body;
    const sql = `INSERT INTO roles (title, salary) VALUES ($1, $2) RETURNING *`;
    const values = [title, salary];
  
    pool.query(sql, values, (err: Error, result: QueryResult) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        const { rows } = result;
        res.json({
        message: 'success',
        data: rows[0],
        });
    });
});

// POST a new employee
app.post('/api/employees', (req, res) => {
    const { name, department, salary } = req.body;
    const sql = `INSERT INTO employees (name, department, salary) VALUES ($1, $2, $3) RETURNING *`;
    const values = [name, department, salary];
  
    pool.query(sql, values, (err: Error, result: QueryResult) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        const { rows } = result;
        res.json({
        message: 'success',
        data: rows[0],
        });
    });
});

// UPDATE an employee's role
app.put('/api/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { role } = req.body;
    const sql = `UPDATE employees SET role = $1 WHERE id = $2 RETURNING *`;
    const values = [role, id];
  
    pool.query(sql, values, (err: Error, result: QueryResult) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        const { rows } = result;
        res.json({
        message: 'success',
        data: rows[0],
        });
    });
});

//Default response for any other request
app.use((_req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/