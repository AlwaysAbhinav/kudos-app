import React, { useState, useEffect } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Avatar } from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar"; // Import the NavBar component
import { getCurrentUser } from "./firebase";

const HomePage = ({ user }) => {
  const [kudosData, setKudosData] = useState([]);
  // const [user, setUser] = useState(null);

  useEffect(() => {
    // getCurrentUser((currentUser) => {
    //   if (currentUser) {
    //     setUser(currentUser);
    //     console.log("Logged in user ID:", currentUser.uid);
    //   } else {
    //     console.log("No user is logged in");
    //   }
    // });

    const fetchKudos = async () => {
      try {
        const response = await axios.get("/kudos");
        setKudosData(response.data);
      } catch (error) {
        console.error("Error fetching kudos:", error);
      }
    };

     fetchKudos();
  }, []);

  const handleCardClick = (userId) => {
    window.location.href = `/details/${userId}`;
  };

  return (
    <div>
      <NavBar user={user} />
      <Grid container spacing={3} justifyContent="center">
        {kudosData.map((userData) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={userData.receiverId}>
            <Card
              sx={{ borderRadius: 2, boxShadow: 3, overflow: "hidden", cursor: "pointer" }}
              onClick={() => handleCardClick(userData.receiverId)}
            >
              <CardMedia
                component="img"
                height="200"
                image={userData.receiverImage || "https://en.wikipedia.org/wiki/Homer_Simpson#/media/File:Homer_Simpson_2006.png"}
                alt={userData.receiverName}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {userData.receiverName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {userData.receiverBio}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
                  Kudos:
                </Typography>
                <ul>
                  {userData.kudos.map((kudo, index) => (
                    <li key={index}>{kudo.text}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
