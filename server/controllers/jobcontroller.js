const Jobs = require("../models/jobmodel");

module.exports = {
  getAllJobs: (req, res) => {
    Jobs.getAll((err, results) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
      } else {
        res.status(200).json(results);
      }
    });
  },
  createJob: (req, res) => { 
    Jobs.create(req.body, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Failed to create job' });
      } else {
        res.status(201).json({ id: result.insertId, ...jobData });
      }
    });
  },
}