import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Typography, Grid, Box, CardMedia, Card, CardContent } from "@mui/material";
import NavBar from "./NavBar";
import { useAuth } from "./AuthContext";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const { user } = useAuth();
  const [kudos, setKudos] = useState([]);
// console.log("UserId:", userId);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log("User Object:", user);
        console.log("User ID:", user.uid);
        const response = await axios.get(`/profile?userId=${user.uid}`);
        // console.log("Response:", response);
        setProfileData(response.data.user);
        setKudos(response.data.kudos);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [user]);

  if (!user) return <div>Loading...</div>;
  if (!profileData) return <div>Loading profile...</div>;

  // console.log("User Below:", user);

  return (
  <div>
    <NavBar />
    <div style={{ padding: "16px", backgroundColor: "#ffffff" }}>
      {/* User Info */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <Avatar
          alt={profileData.name}
          src={profileData.profileImage}
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
            {profileData.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" style={{ color: "#717171" }}>
            {profileData.bio}
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
                <Typography variant="body2" sx={{ color: "#717171",  marginLeft: 'auto' }}>
                  {new Date(kudo.createdDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  }).replace(/ /g, '-')}
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