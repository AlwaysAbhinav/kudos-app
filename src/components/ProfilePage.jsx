import React, { useState, useEffect } from "react";
import { Avatar, Typography, Grid, Box, CardMedia, Card, CardContent } from "@mui/material";

const ProfilePage = ({ user }) => {
  const [kudos, setKudos] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchKudos = async () => {
      const data = [
        {
          id: 1,
          imageUrl: "https://res.cloudinary.com/dgvyblmwc/image/upload/v1710241645/student-2_kbdou4.jpg",
          text: "Thank you for always supporting me!",
          sender: "John Doe",
        },
        {
          id: 2,
          imageUrl: "https://res.cloudinary.com/dgvyblmwc/image/upload/v1710241644/student-3_jrchy8.jpg",
          text: "Your guidance made all the difference!",
          sender: "Jane Smith",
        },
        {
          id: 3,
          imageUrl: "https://res.cloudinary.com/dgvyblmwc/image/upload/v1563537382/mr2zzvwqwzjuqh9qoxfs.png",
          text: "Your guidance made all the difference!",
          sender: "Jane Smith",
        },
        {
          id: 4,
          imageUrl: "https://res.cloudinary.com/dgvyblmwc/image/upload/v1710241644/student-1_pn14dl.jpg",
          text: "Your are the best!",
          sender: "Ravi Patel",
        },
        {
          id: 5,
          imageUrl: "https://res.cloudinary.com/dgvyblmwc/image/upload/v1710241644/student-4_yvwgot.jpg",
          text: "You go boy, you go!",
          sender: "Kiran Kumar",
        },
        {
          id: 6,
          imageUrl: "https://res.cloudinary.com/dgvyblmwc/image/upload/v1563801291/qw6bkissy0s86tpxaskl.jpg",
          text: "The world is not enough!",
          sender: "Sam Altman",
        },
      ];
      setKudos(data);
    };

    fetchKudos();
  }, []);

  return (
    <div style={{ padding: "16px", backgroundColor: "#ffffff" }}>
      {/* User Info */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
      >
        <Avatar
          alt={user.name}
          src={user.profileImage}
          style={{
            width: 120,
            height: 120,
            border: "2px solid #e60023",
            marginRight: "16px",
          }}
        />
        <div>
          <Typography
            variant="h4"
            style={{ fontWeight: "bold", color: "#333333" }}
          >
            {user.name}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ color: "#717171" }}
          >
            {user.bio}
          </Typography>
        </div>
      </div>

      {/* Kudos Timeline */}
      <Grid container spacing={2}>
        {kudos.map((kudo, index) => (
          <Grid item xs={12} sm={6} md={4} key={kudo.id}>
              <Card>
              <Box display="flex" alignItems="center">
                <CardMedia
                  component="img"
                  image={kudo.imageUrl}
                  alt={kudo.text}
                  sx={{ width: 80, height: 80, borderRadius: '50%', marginRight: 2 }}
                />
                <Typography variant="body2" sx={{ color: "#717171", fontWeight: 'bold', marginRight: 'auto' }}>
                  From: {kudo.sender}
                </Typography>
              </Box>            
                <CardContent>
                  <Typography variant="body1" style={{ color: "#333333" }}>
                    <label key={index}>{kudo.text}</label>
                  </Typography>

                </CardContent>
              </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProfilePage;
