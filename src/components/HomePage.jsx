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

  // useEffect(() => {
  //   // Simulate fetching data from an API
  //   const fetchKudos = async () => {
  //     const data = [
  //       {
  //         id: 1,
  //         imageUrl: "https://res.cloudinary.com/dgvyblmwc/image/upload/v1710241645/student-2_kbdou4.jpg",
  //         text: "Thank you for always supporting me!",
  //         sender: "John Doe",
  //       },
  //       {
  //         id: 2,
  //         imageUrl: "https://res.cloudinary.com/dgvyblmwc/image/upload/v1710241644/student-3_jrchy8.jpg",
  //         text: "Your guidance made all the difference!",
  //         sender: "Jane Smith",
  //       },
  //       {
  //         id: 3,
  //         imageUrl: "https://via.placeholder.com/300",
  //         text: "Your guidance made all the difference!",
  //         sender: "Jane Smith",
  //       },
  //       {
  //         id: 4,
  //         imageUrl: "https://res.cloudinary.com/dgvyblmwc/image/upload/v1710241644/student-1_pn14dl.jpg",
  //         text: "Your are the best!",
  //         sender: "Ravi Patel",
  //       },
  //       {
  //         id: 5,
  //         imageUrl: "https://res.cloudinary.com/dgvyblmwc/image/upload/v1710241644/student-4_yvwgot.jpg",
  //         text: "You go boy, you go!",
  //         sender: "Kiran Kumar",
  //       },
  //       {
  //         id: 6,
  //         imageUrl: "https://res.cloudinary.com/dgvyblmwc/image/upload/v1563801291/qw6bkissy0s86tpxaskl.jpg",
  //         text: "The world is not enough!",
  //         sender: "Sam Altman",
  //       },
  //     ];
  //     setKudos(data);
  //   };

    fetchKudos();
  }, []);

  return (
    <div>
      <NavBar user={user} />
      <Grid container spacing={3} justifyContent="center">
        {kudosData.map((userData) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={userData.receiverId}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, overflow: "hidden" }}>
              <CardMedia
                component="img"
                height="200"
                // image={userData.receiverImage || "https://example.com/default-profile.png"}
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
