const Posts = require("../models/postmodel");

module.exports = {
  getAllPosts: (req, res) => {
    console.log(req.user);
    Posts.getAll((err, results) => {
      if (err) {
        res.status(500).json({ error: "Failed to fetch posts" });
      } else {
        res.status(200).json(results);
      }
    });
  },
  createPost: (req, res) => {
    const postData = req.body;
    Posts.create(postData, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Failed to create post" });
      } else {
        res.status(201).json({ id: result.insertId, ...postData });
      }
    });
  },
};
