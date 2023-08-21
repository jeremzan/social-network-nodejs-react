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
import { useNavigate } from "react-router-dom";
import FriendCard from "./FriendCard";

const Friends = ({ userInfo }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [friends, setFriends] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      alert("You need to enter a name !");
      return;
    }
    const data = new FormData(event.currentTarget);
    const userName = data.get("username");
    axios
      .get(`/friends/${userName}`)
      .then((response) => {
        console.log(response);
        setName("");
        setFriends(response.data);
      })
      .catch((error) => console.error(error));
  };

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
            {/* onSubmit={handleSubmit} */}
            <Box component="form" noValidate sx={{ mt: 1 }}>
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
