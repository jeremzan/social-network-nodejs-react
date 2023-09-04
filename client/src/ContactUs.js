import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import { blue } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        content: "",
    });
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name } = formData;
        const thankYouMessage = `Thank you, ${name}, we'll be in touch.`;
        setMessage(thankYouMessage);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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
                <Avatar sx={{ m: 1, bgcolor: blue[700] }}>
                    <SendIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Contact us
                </Typography>
                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {message && (
                        <Typography variant="body1" color="textSecondary">
                            {message}
                        </Typography>
                    )}
                    {!message && (
                        <Box
                            component="form"
                            noValidate
                            sx={{ mt: 1 }}
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                label="Email"
                                type="email"
                                id="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                rows={5}
                                name="content"
                                label="Your message"
                                id="content"
                                sx={{ width: "100%" }}
                                value={formData.content}
                                onChange={handleInputChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Send a message
                            </Button>
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }} >
                    <Grid container>
                        <Grid item xs>
                            <Link to="/" variant="body2">
                                {"Back to homepage"}
                            </Link>

                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default ContactUs;
