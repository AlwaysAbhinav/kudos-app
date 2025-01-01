import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import KudosSubmissionPage from "./components/KudosSubmissionPage";


const App = () => {
  // const user = {
  //   id: 'HSdinfNBCSm2UnGrSTL7',c6Ihs3GexEFvOmIhp0no
  //   name: 'John Doe',
  //   about: 'A software developer with a passion for clean code.',
  //   profileImage: 'https://res.cloudinary.com/dgvyblmwc/image/upload/v1563801291/qw6bkissy0s86tpxaskl.jpg'
  // };
  const userId = 'HSdinfNBCSm2UnGrSTL7';

 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage userId={userId} />} />
          <Route path="/create" element={<KudosSubmissionPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
    );
};

export default App;
