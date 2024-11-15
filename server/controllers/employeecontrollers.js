const Employee = require('../models/employeemodels');

module.exports = {
  createEmployee: (req, res) => {
    Employee.createEmployee(req.body, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Failed to create employee' });
      } else {
        res.status(201).json(result);
      }
    });
  },

  createEmployer: (req, res) => {
    Employee.createEmployer(req.body, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Failed to create employer' });
      } else {
        res.status(201).json(result);
      }
    });
  }
};
console.log(
  aaaaa
)