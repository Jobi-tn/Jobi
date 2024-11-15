const authModel = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key';

function signupEmployee(req, res) {
    const { name, lastname, email, password } = req.body;

    authModel.createEmployee(name, lastname, email, password, (err, results) => {
        if (err) {
            console.error('Error signing up employee:', err);
            res.status(500).send('Error signing up employee');
        } else {
            res.send('Employee signed up successfully');
        }
    });
}

function signupEmployer(req, res) {
    const { nameCompany, matriculeFiscale, email, password } = req.body;

    authModel.createEmployer(nameCompany, matriculeFiscale, email, password, (err, results) => {
        if (err) {
            console.error('Error signing up employer:', err);
            res.status(500).send('Error signing up employer');
        } else {
            res.send('Employer signed up successfully');
        }
    });
}

function login(req, res) {
    const { email, password } = req.body;

    authModel.findUserByEmail(email, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                if (match) {
                    const token = jwt.sign({ id: user.id, email: user.email, userType: user.userType }, JWT_SECRET, {
                        expiresIn: '1h'
                    });
                    res.json({ message: 'User logged in successfully', token });
                } else {
                    res.status(401).send('Invalid credentials');
                }
            });
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
}

module.exports = { signupEmployee, signupEmployer, login };
