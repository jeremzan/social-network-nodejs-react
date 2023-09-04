import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { useState } from "react";
import axios from "axios";

const MyPost = ({ userInfo }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    if (new Date().getTime() < JSON.parse(localStorage.getItem("userInfo")).expiry) {
      event.preventDefault();
      if (!title.trim() || !content.trim()) {
        alert("Please write a title and put some content for your post !");
        return;
      }
      const data = new FormData(event.currentTarget);
      const newPost = {
        userId: userInfo.id,
        title: data.get("title"),
        content: data.get("content"),
        insertionTime: new Date(),
        userName: userInfo.firstName + " " + userInfo.lastName,
      };

      axios
        .post("/feed/newpost", newPost)
        .then((response) => {
          console.log(response)
          window.location.reload(true)
        })
        .catch((error) => console.error(error));
    }
  };


  return (
    <Container
      component="main"
      maxWidth="sx"
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "100px",
      }}
    >
      <CssBaseline />
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 600,
        }}
      >
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 600,
          }}
        >
          <Typography component="h1" variant="h5">
            New Post
          </Typography>
          <Box
            onSubmit={handleSubmit}
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={5}
              name="content"
              label="Content"
              id="content"
              inputProps={{ maxLength: 300 }}
              sx={{ width: "100%" }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              helperText={`${300 - content.length} characters remaining`}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default MyPost;
