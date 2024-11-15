const connection = require('../database/index');

const Jobs = {
  getAll: function(callback) {
    connection.query("SELECT * FROM joboffers", callback);
  },
  create: function(job, callback) {
    connection.query("INSERT INTO joboffers SET ?", job, callback);
  },
}

module.exports = Jobs;