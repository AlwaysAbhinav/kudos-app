// filepath: /C:/Users/User/Projects/kudos-app/src/components/NavBar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { signOutUser } from "./firebase";

const NavBar = ({ user }) => {

const handleHomeClick = () => {
        window.location.href = "/";
    };

const handleProfileClick = () => {
    window.location.href = "/profile";
};

const handleSubmitClick = () => {
    window.location.href = "/create";
};

const handleLoginClick = () => {
    window.location.href = "/login";
};

return (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
                Kudos App
            </Typography>
            {user && (
                <>
                    <Typography variant="body1" style={{ marginRight: "16px" }}>
                        Welcome, {user.displayName}
                    </Typography>
                    <Button color="inherit" onClick={signOutUser}>Logout</Button>
                </>
            )}            
            <Button color="inherit" onClick={handleLoginClick}>Login</Button>
            <Button color="inherit" onClick={handleHomeClick}>Home</Button>
            <Button color="inherit" onClick={handleProfileClick}>Profile</Button>
            <Button color="inherit" onClick={handleSubmitClick}>Submit Kudo</Button>
        </Toolbar>
    </AppBar>
);
};

export default NavBar;