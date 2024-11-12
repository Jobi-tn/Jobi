const express = require('express');
const router = express.Router();
const jobcontrollers = require("../controllers/jobcontroller");

router.get('/getall', jobcontrollers.getAllJobs);
router.post('/create', jobcontrollers.createJob); 

module.exports = router;