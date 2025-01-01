// filepath: /C:/Users/User/Projects/kudos-app/src/components/Login.jsx
import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { signInWithGoogle } from "./firebase";

const Login = () => {
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
      <Button
        variant="contained"
        color="primary"
        onClick={signInWithGoogle}
        style={{ backgroundColor: "#e60023", color: "#ffffff" }}
      >
        Login with Google
      </Button>
    </Box>
  );
};

export default Login;