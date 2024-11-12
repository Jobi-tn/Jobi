const connection = require('../database/index');

const Posts = {
  getAll: function(callback) {
    connection.query("SELECT * FROM posts", callback);
  },
  create: function(postData, callback) { 
    const query = "INSERT INTO posts (title, description, employees_idemployees, employers_idemployers) VALUES (?, ?, ?, ?)";
    connection.query(query, [postData.title, postData.description, postData.employees_idemployees, postData.employers_idemployers], callback);
  },
}

module.exports = Posts;