const db = require('../database/index');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

function createEmployee(name, lastname, email, password, callback) {
    bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
        if (err) return callback(err);

        const query = 'INSERT INTO employees (name, lastname, mail, password) VALUES (?, ?, ?, ?)';
        db.query(query, [name, lastname, email, hashedPassword], callback);
    });
}

function createEmployer(nameCompany, matriculeFiscale, email, password, callback) {
    bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
        if (err) return callback(err);

        const query = 'INSERT INTO employers (name, matricule_fiscale, email, password) VALUES (?, ?, ?, ?)';
        db.query(query, [nameCompany, matriculeFiscale, email, hashedPassword], callback);
    });
}

function findUserByEmail(email, callback) {
    const query = `
        SELECT idemployees AS id, mail AS email, password, 'employee' AS userType
        FROM employees WHERE mail = ?
        UNION
        SELECT idemployers AS id, email, password, 'employer' AS userType
        FROM employers WHERE email = ?
    `;
    db.query(query, [email, email], callback);
}

module.exports = {
    createEmployee,
    createEmployer,
    findUserByEmail
};
