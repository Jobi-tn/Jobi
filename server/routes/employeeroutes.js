const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeecontrollers');

router.post('/employee/create', employeeController.createEmployee);

module.exports = router;
