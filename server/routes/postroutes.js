const express = require("express");
const router = express.Router();
const postcontrollers = require("../controllers/postcontrollers");

router.get("/getall", postcontrollers.getAllPosts);
router.post("/create", postcontrollers.createPost);

module.exports = router;
