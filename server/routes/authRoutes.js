// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/signup/employee', authController.signupEmployee);
router.post('/signup/employer', authController.signupEmployer);
router.post('/login', authController.login);

module.exports = router;