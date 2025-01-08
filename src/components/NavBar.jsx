import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { signOutUser } from "./firebase";
import { useAuth } from "./AuthContext";
import { getAuth, signOut } from "firebase/auth";

const NavBar = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
        const auth = getAuth();
        // signOutUser(auth);
        signOut(auth);
        navigate('/login'); // Redirect to login after logout
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    if (loading) return null;

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
                        Welcome, {user.email}
                    </Typography>
                </>
            )}
            <Button color="inherit" onClick={handleHomeClick}>Home</Button>
            {!user && (
                <>
                    <Button color="inherit" onClick={handleLoginClick}>Login</Button>
                    
                </>
            )}
            {user && (
                <>
                    <Button color="inherit" onClick={handleProfileClick}>Profile</Button>
                    <Button color="inherit" onClick={handleSubmitClick}>Give Kudos</Button>
                    <Button color="inherit" onClick={signOutUser}>Logout</Button>
                </>
            )}
            {/* <Button color="inherit" onClick={handleLoginClick}>Login</Button>
            <Button color="inherit" onClick={handleHomeClick}>Home</Button> */}
            {/* <Button color="inherit" onClick={handleProfileClick}>Profile</Button>
            <Button color="inherit" onClick={handleSubmitClick}>Submit Kudo</Button> */}
        </Toolbar>
    </AppBar>
);
};

export default NavBar;