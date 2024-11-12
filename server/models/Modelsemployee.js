const connection = require('../database/index');

const addEmployee = (employeeData, callback) => {
    const query = 'INSERT INTO employees SET ?'
    connection.query(query, employeeData, callback)
}
const findbymail = (mail, callback) => {
    const query = 'SELECT * FROM employees WHERE mail = ?'
    connection.query(query, [mail], callback)
}

module.exports = {
    addEmployee, findbymail
}