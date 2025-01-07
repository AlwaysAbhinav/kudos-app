import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import Login from "./components/Login";
import KudosSubmissionPage from "./components/KudosSubmissionPage";
import { useState, useEffect } from "react";
import { getCurrentUser } from "./components/firebase";
import ProtectedRoute from "./components/ProtectedRoute";
import DetailsPage from "./components/DetailsPage";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getCurrentUser((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserId(currentUser.uid);
        console.log("Logged in user ID:", currentUser.uid);
      } else {
        console.log("No user is logged in");
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking auth state
  }
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details/:userId" element={<DetailsPage />} />
        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <KudosSubmissionPage />
            </ProtectedRoute>
          }
        />
          {/* <Route path="/profile" element={<ProfilePage userId={userId} />} />
          <Route path="/create" element={<KudosSubmissionPage userId={userId} />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
    );
};

export default App;
