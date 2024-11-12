const { addEmployee, findbymail } = require('../models/Modelsemployee')


const checkEmail = (req, res) => {
    const { mail } = req.body;

    findbymail(mail, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json({ exists: result.length > 0 });
    });
};



const createEmployee = (req, res) => {
    const { mail, password } = req.body;

    if (password.length <= 8) {
        return res.status(400).json("Password must be more than 8 characters.");
    }

    findbymail(mail, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (result.length > 0) {
            return res.status(400).json("Email is already in use.");
        }

        addEmployee(req.body, (err, result) => {
            if (err) {
                console.log("Requête de signup reçue :", err);
                res.status(500).json(err);
            } else {
                res.status(201).json("Employee added successfully");
            }
        });
    });
};

// In controller
const Login = (req, res) => {
    const { mail, password } = req.body; // Adjusted from email to mail

    findbymail(mail, (err, result) => { // using mail for the database query
        if (err) {
            return res.status(500).json(err);
        } else if (result.length === 0) {
            return res.status(404).json('Employee not found');
        }

        const employee = result[0];

        if (employee.password !== password) {
            return res.status(401).json("Password incorrect");
        }
        return res.status(200).json("Login successful");
    });
};




module.exports = {
    createEmployee,
    Login,
    checkEmail
};