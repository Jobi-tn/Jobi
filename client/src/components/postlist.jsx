import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts/getall", {

      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleCommentChange = (postId, e) => {
    setComments({
      ...comments,
      [postId]: e.target.value,
    });
  };

  const handleCommentSubmit = (postId) => {
    console.log(`Comment for Post ${postId}:`, comments[postId]);
    setComments({
      ...comments,
      [postId]: "",
    });
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {posts.map((post) => (
        <Grid item key={post.idposts} xs={12} sm={12} md={8}>
          <Card
            style={{
              width: "70%",
              margin: "20px",
              padding: "20px",
              textAlign: "center",
              marginLeft: "105px",
            }}
          >
            <CardContent>
              <Typography variant="h5">{post.title}</Typography>
              <Typography variant="body2">{post.description}</Typography>
            </CardContent>
          </Card>

          <Card
            style={{
              width: "40%",
              margin: "20px",
              padding: "20px",
              textAlign: "center",
              marginLeft: "250px",
            }}
          >
            <CardContent>
              <Typography variant="h6">Leave a Comment</Typography>
              <input
                type="text"
                placeholder="Your comment here"
                value={comments[post.idposts] || ""}
                onChange={(e) => handleCommentChange(post.idposts, e)}
                style={{ width: "40%", padding: "10px", marginTop: "10px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleCommentSubmit(post.idposts)}
                style={{ marginTop: "0px", backgroundColor: "#77b300" }}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
