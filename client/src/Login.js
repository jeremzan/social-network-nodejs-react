import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Login = ({ parentCallback, userInfo }) => {
  const navigate = useNavigate();

  const isValidUser = (user) => {
    const mailFormat =
      /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    const passwordFormat = /^\S+$/;
    return (
      (passwordFormat.test(user.password) && mailFormat.test(user.email)) ||
      (user.email === "admin" && user.password === "admin")
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const rememberMe = data.get("remember") === "remember";

    const loggedUser = {
      email: data.get("email"),
      password: data.get("password"),
      checkbox: rememberMe,
    };

    if (!isValidUser(loggedUser)) {
      alert("User's login info is not valid.");
    } else {
      axios
        .post("/login", loggedUser)
        .then((response) => {
          if (response.status === 201) {
            alert(
              "Password or email incorrect. If you didn't register please do so."
            );
          } else {
            console.log(response.data);

            parentCallback(response.data.user, response.data.checkbox);

            if (response.data.user.email === "admin") {
              navigate("/admin");
            } else {
              navigate("/dashboard/feed");
            }
          }
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.email === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [userInfo, navigate]);

  if (userInfo) {
    return null;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox value="remember" color="primary" name="remember" />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/" variant="body2">
                  {"Back to homepage"}
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Register!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }
};

export default Login;

// if (loggedUser.email === "admin" && loggedUser.password === "admin") {
//   navigate("/admin");
// }
