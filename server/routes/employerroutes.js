const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeecontrollers');

router.post('/api/employer/create', employeeController.createEmployer);

module.exports = router; 