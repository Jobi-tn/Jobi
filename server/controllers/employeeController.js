const employeeModel = require('../models/employeeModel');

function signupEmployee(req, res) {
    const { name, lastname, email, password } = req.body;

    if (password.length < 8) {
        return res.status(400).send('Password must be at least 8 characters');
    }

    employeeModel.findEmployeeByEmail(email, (err, results) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            return res.status(400).send('Email is already in use');
        }

        employeeModel.addEmployee(name, lastname, email, password, (err, results) => {
            if (err) {
                console.error('Error signing up employee:', err);
                return res.status(500).send('Error signing up employee');
            }
            res.send('Employee signed up successfully');
        });
    });
}

module.exports = { signupEmployee };
