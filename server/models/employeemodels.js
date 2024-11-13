const db = require('../database/index');

function addEmployee(name, lastname, email, password, callback) {
    const query = 'INSERT INTO employees (name, lastname, mail, password) VALUES (?, ?, ?, ?)';
    db.query(query, [name, lastname, email, password], callback);
}

function findEmployeeByEmail(email, callback) {
    const query = 'SELECT * FROM employees WHERE mail = ?';
    db.query(query, [email], callback);
}

module.exports = { addEmployee, findEmployeeByEmail };
