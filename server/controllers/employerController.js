const employerModel = require('../models/employerModel');

function signupEmployer(req, res) {
    const { nameCompany, matriculeFiscale, email, password } = req.body;

    if (password.length < 8) {
        return res.status(400).send('Password must be at least 8 characters');
    }

    employerModel.findEmployerByEmail(email, (err, results) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            return res.status(400).send('Email is already in use');
        }

        employerModel.addEmployer(nameCompany, matriculeFiscale, email, password, (err, results) => {
            if (err) {
                console.error('Error signing up employer:', err);
                return res.status(500).send('Error signing up employer');
            }
            res.send('Employer signed up successfully');
        });
    });
}

module.exports = { signupEmployer };
