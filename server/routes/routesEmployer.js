const express = require('express');
const router = express.Router();
const employerController = require('../controllers/employerController');

router.post('/signup', employerController.signupEmployer);

module.exports = router;
