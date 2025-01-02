// filepath: /C:/Users/User/Projects/kudos-app/src/components/Login.jsx
import React, { useState } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from "./firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailLogin = async () => {
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      window.location.href = "/";
    } catch (error) {
      console.error("Error during email login:", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Kudos App
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
        style={{ marginBottom: "16px" }}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={handlePasswordChange}
        style={{ marginBottom: "16px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleEmailLogin}
        style={{ backgroundColor: "#e60023", color: "#ffffff", marginBottom: "16px" }}
      >
        {isSignUp ? "Sign Up" : "Login"} with Email
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={signInWithGoogle}
        style={{ backgroundColor: "#e60023", color: "#ffffff" }}
      >
        Login with Google
      </Button>
      <Button
        variant="text"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </Button>
    </Box>
  );
};

export default Login;