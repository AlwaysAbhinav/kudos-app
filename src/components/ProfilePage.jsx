import React from "react";
import { Avatar, Typography, Grid, Card, CardContent } from "@mui/material";

const ProfilePage = ({ user, kudos }) => {
  return (
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
          }}
        />
        <div>
          <Typography variant="h4" style={{ fontWeight: "bold", color: "#333333" }}>
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
        {kudos.map((kudo) => (
          <Grid item xs={12} sm={6} md={4} key={kudo.id}>
            <Card>
              <CardContent>
                <Typography variant="body1" style={{ color: "#333333" }}>
                  {kudo.text}
                </Typography>
                <Typography variant="body2" style={{ color: "#717171" }}>
                  From: {kudo.sender}
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
