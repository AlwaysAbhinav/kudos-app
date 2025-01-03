import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Typography, Grid, Box, CardMedia, Card, CardContent } from "@mui/material";
import NavBar from "./NavBar";

const ProfilePage = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [kudos, setKudos] = useState([]);
// console.log("UserId:", userId);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/profile?userId=${userId}`);
        // console.log("Response:", response);
        setUser(response.data.user);
        setKudos(response.data.kudos);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }
  // console.log("User Below:", user);

  return (
  <div>
    <NavBar />
    <div style={{ padding: "16px", backgroundColor: "#ffffff" }}>
      {/* User Info */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <Avatar
          alt={user.name}
          src={user.profileImage}
          style={{
            width: 120,
            height: 120,
            border: "2px solid #e60023",
            marginRight: "16px",
            borderRadius: 0, // Set borderRadius to 0 to make it a square
          }}
        />
        <div>
          <Typography variant="h4" style={{ fontWeight: "bold", color: "#333333" }}>
            {user.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" style={{ color: "#717171" }}>
            {user.bio}
          </Typography>
        </div>
      </div>
      {/* Kudos List */}
      <Grid container spacing={2}>
        {kudos.map((kudo) => (
          <Grid item xs={12} sm={6} md={4} key={kudo.id}>
            <Card>
            <CardContent>
                <Typography variant="body1" style={{ color: "#333333" }}>
                  {kudo.text}
                </Typography>
              </CardContent>              
              <Box display="flex" alignItems="center">
                <CardMedia
                  component="img"
                  image={kudo.giver.image}
                  alt={kudo.giver.name}
                  sx={{ width: 40, height: 40, borderRadius: '50%', marginLeft: 2 }}
                />
                <Typography variant="body2" sx={{ color: "#717171",  marginRight: 'auto' }}>
                  {kudo.giver.name}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  </div>
  );
};

export default ProfilePage;