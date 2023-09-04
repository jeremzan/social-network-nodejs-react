import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import FriendCard from "./FriendCard";

const Friends = ({ userInfo }) => {

  const [friends, setFriends] = useState([]);
  const [suffixFeature, setSuffixFeature] = useState(true)

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const friendUserName = data.get("username").trim();

    if (!friendUserName) {
      alert("You need to enter a name !");
      return;
    }

    if (/\s{2,}/.test(friendUserName)) {
      alert("Please enter a valid name without consecutive spaces!");
      return;
    }

    axios
      .get(`/friends/`, {
        params: {
          friendusername: friendUserName,
          userid: userInfo.id,
          suffixFeature: suffixFeature
        }
      })
      .then((response) => {
        console.log(response);
        setFriends(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axios
      .get("/features")
      .then((response) => {
        setSuffixFeature(response.data.suffixFeature)
      })
      .catch((error) => console.error(error));
  })


  return (
    <div className="friends">
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
              Search friends
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
                id="username"
                label="Name"
                name="username"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Search
              </Button>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: 12, textAlign: "right", color: "gray" }}
              >
                {suffixFeature ? "Search by suffix" : "Search by prefix"}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Container>

      {friends &&
        friends.map((friend) => (
          <FriendCard key={friend.id} friend={friend} userInfo={userInfo} />
        ))}
    </div>
  );
};

export default Friends;
