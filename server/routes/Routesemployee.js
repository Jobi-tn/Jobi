const express = require('express');
const { createEmployee, Login, checkEmail } = require('../controllers/Controlleremployee');

const router = express.Router();

router.post('/signup', createEmployee);
router.post('/login', Login);
router.post('/checkemail', checkEmail); 

module.exports = router;