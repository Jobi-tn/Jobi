const authModel = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key';

function signupEmployee(req, res) {
    const { name, lastname, email, password } = req.body;

    authModel.findUserByEmail(email, (err, results) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            return res.status(400).send('Email is already in use');
        }

        authModel.createEmployee(name, lastname, email, password, (err, results) => {
            if (err) {
                console.error('Error signing up employee:', err);
                return res.status(500).send('Error signing up employee');
            }
            res.send('Employee signed up successfully');
        });
    });
}

function signupEmployer(req, res) {
    const { nameCompany, matriculeFiscale, email, password } = req.body;

    authModel.findUserByEmail(email, (err, results) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            return res.status(400).send('Email is already in use');
        }

        authModel.createEmployer(nameCompany, matriculeFiscale, email, password, (err, results) => {
            if (err) {
                console.error('Error signing up employer:', err);
                return res.status(500).send('Error signing up employer');
            }
            res.send('Employer signed up successfully');
        });
    });
}

function login(req, res) {
    const { email, password } = req.body;

    authModel.findUserByEmail(email, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).send('Internal Server Error');
                }

                if (match) {
                    const token = jwt.sign({ id: user.id, email: user.email, userType: user.userType }, JWT_SECRET, {
                        expiresIn: '1h'
                    });
                    return res.json({ message: 'User logged in successfully', token });
                } else {
                    return res.status(401).send('Invalid credentials');
                }
            });
        } else {
            return res.status(401).send('Invalid credentials');
        }
    });
}

module.exports = { signupEmployee, signupEmployer, login };