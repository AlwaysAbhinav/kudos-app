// filepath: /C:/Users/User/Projects/kudos-app/src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Box, Typography, TextField } from "@mui/material";
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from "./firebase";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'; // Default to home page

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
      // window.location.href = "/";
      navigate(from); // Redirect to the original page after login
    } catch (error) {
      console.error("Error during email login:", error);
    }
  };

  return (
    // Add a background image to the login page

    <div className="login-page">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        // bgcolor="#f5f5f5"
        className="login-box"
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
    </div>
  );
};

export default Login;