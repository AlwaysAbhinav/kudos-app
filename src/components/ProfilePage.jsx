import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Typography, Grid, Box, CardMedia, Card, CardContent, Button } from "@mui/material";
import NavBar from "./NavBar";
import { useAuth } from "./AuthContext";
import RequestKudos from "./RequestKudos";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const { user } = useAuth();
  const [kudos, setKudos] = useState([]);
  const [kudosGiven, setKudosGiven] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tag, count] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

// console.log("UserId:", userId);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // console.log("User Object:", user);
        // console.log("User ID:", user.uid);
        const response = await axios.get(`/profile?userId=${user.uid}`);
        // console.log("Response:", response);
        setProfileData(response.data.user);
        setKudos(response.data.kudos);
        setKudosGiven(response.data.kudosGiven);
        if (response) {
          const userData = response.data.user;
          const userTags = userData.tags || {};
          // console.log('User Tags with Counts:',userTags);
          //Iterate over the userTags and console.log the tag and count
          // for (const [tag, count] of Object.entries(userTags)) {
          //   console.log(`${tag}: ${count}`);
          // }
            // selectedTags.push(tag);
          setSelectedTags(userTags);
        } 
        // const selectedTagsString = JSON.stringify(response.data.user.tags);
        
        // console.log("Selected Tags:", response.data.user.tags);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleGiveKudosClick = () => {
    window.location.href = `/create`;
  }

  const handleRequestKudosClick = () => {
  }

  if (!user) return <div>Loading...</div>;
  if (!profileData) return <div>Loading profile...</div>;

  // console.log("User Below:", user);

  return (
    <div>
      <NavBar />
      <div style={{ display: "flex", flexDirection: "column", padding: "16px", backgroundColor: "#ffffff" }}>
        {/* Profile Section */}
        <div style={{ backgroundColor: "#f0f0f0", padding: "16px", marginBottom: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <Avatar
              alt={profileData.name}
              src={profileData.profileImage}
              style={{
                width: 120,
                height: 120,
                border: "2px solid #e60023",
                marginRight: "16px",
                borderRadius: 0,
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
        </div>
        {/* Tags Section */}
        <div style={{ backgroundColor: "#d0d0d0", padding: "16px" }}>
          <Typography variant="h6" style={{ fontWeight: "bold", color: "#333333" }}>
            Tags
          </Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
              {Object.entries(selectedTags || {}).length > 0 ? (
                Object.entries(selectedTags).map(([tag, count], index) => (
                  <Box
                    key={index}
                    sx={{
                      backgroundColor: "#ffffff",
                      color: "#333333",
                      padding: "8px 16px",
                      borderRadius: "16px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {tag}: {count}
                  </Box>
                ))
              ) : (
                <Typography variant="body2" style={{ color: "#717171", padding: "16px" }}>
                  No Tags received
                </Typography>
              )}

            {/* ))} */}
          </Box>
        </div>        
        {/* /* Kudos Received Section */ }
        <div style={{ backgroundColor: "#e0e0e0", padding: "16px", marginBottom: "8px" }}>
          <Typography variant="h6" style={{ fontWeight: "bold", color: "#333333" }}>
            Kudos Received
          </Typography>
          <Grid container spacing={2}>
            {kudos && kudos.length > 0 ? (
              kudos.map((kudo) => (
                <Grid item xs={12} sm={6} md={4} key={kudo.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="body1" style={{ color: "#333333" }}>
                        {kudo.text}
                      </Typography>
                    </CardContent>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={kudo.giver.image}
                        sx={{ width: 40, height: 40, marginLeft: 2 }}
                      />
                      <Typography variant="body2" sx={{ color: "#717171", marginRight: 'auto' }}>
                        {kudo.giver.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#717171", marginLeft: 'auto' }}>
                        {new Date(kudo.createdDate).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        }).replace(/ /g, '-')}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body2" style={{ color: "#717171", padding: "16px" }}>
                No Kudos Received
              </Typography>
            )}
          </Grid>
          <Box display="flex" justifyContent="flex-end" width="100%" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                style={{ backgroundColor: "#e60023", color: "#ffffff"}}
              >
                Request Kudos
              </Button>
              <RequestKudos open={open} handleClose={handleClose} userId={user.uid} userEmail={user.email} />
            </Box>
        </div>
        <div style={{ backgroundColor: "#e0e0e0", padding: "16px", marginBottom: "8px" }}>
          <Typography variant="h6" style={{ fontWeight: "bold", color: "#333333" }}>
            Kudos Given
          </Typography>
          <Grid container spacing={2}>
            {/* Put a condition to show the below section if kudosGiven is not null */}
            {kudosGiven && kudosGiven.length > 0 ?(
              <>
              {kudosGiven.map((kudo) => (
                <Grid item xs={12} sm={6} md={4} key={kudo.id}>
                  <Card>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        alt={kudo.receiver.name}
                        src={kudo.receiver.image}
                        sx={{ width: 40, height: 40, marginLeft: 2 }}
                      />
                      <Typography variant="body2" sx={{ color: "#717171", marginRight: 'auto' }}>
                        {kudo.receiver.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#717171", marginLeft: 'auto' }}>
                        {new Date(kudo.createdDate).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        }).replace(/ /g, '-')}
                      </Typography>
                    </Box>
                    <CardContent>
                      <Typography variant="body1" style={{ color: "#333333" }}>
                        {kudo.text}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </>
          )
          : (
            <Typography variant="body2" style={{ color: "#717171", padding: "16px" }}>
              No Kudos Given
            </Typography>
          )}
            <Box display="flex" justifyContent="flex-end" width="100%" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGiveKudosClick}
                style={{ backgroundColor: "#e60023", color: "#ffffff"}}
              >
                Give Kudos
              </Button>
            </Box>
          </Grid>
        </div>        
      </div>
    </div>
  );
};

export default ProfilePage;