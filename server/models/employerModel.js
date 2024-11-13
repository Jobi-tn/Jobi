const db = require('../database/index');

function addEmployer(nameCompany, matriculeFiscale, email, password, callback) {
    const query = 'INSERT INTO employers (name, matricule_fiscale, email, password) VALUES (?, ?, ?, ?)';
    db.query(query, [nameCompany, matriculeFiscale, email, password], callback);
}

function findEmployerByEmail(email, callback) {
    const query = 'SELECT * FROM employers WHERE email = ?';
    db.query(query, [email], callback);
}

module.exports = { addEmployer, findEmployerByEmail };
