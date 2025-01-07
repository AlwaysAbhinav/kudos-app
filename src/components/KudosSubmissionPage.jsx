import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
// add a dropdown with values for the giverId
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useEffect } from "react";
import NavBar from "./NavBar";
import { useAuth } from "./AuthContext";

const KudosSubmissionPage = () => {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  // const [sender, setSender] = useState(user.displayName);
  const [receiverId, setReceiverId] = useState("");
  const [giverId, setGiverId] = useState(user.uid);
  // const [loggedInUserId, setLoggedInUserId] = useState(userId);// TODO: Change this to logged in user later. Currently Ravi Patel hardcoded
  const [usersList, setUsersList] = useState([]);
  

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    if (image) {
      console.log("Image:", image);
      formData.append("image", image);
    }
    // formData.append("sender", sender);
    formData.append("receiverId", receiverId);
    formData.append("giverId", giverId);

    try {
      await axios.post("/kudos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Clear the form after submission
      setText("");
      setImage(null);
      setGiverId("");
      setReceiverId("");
      window.location.href = "/";
    } catch (error) {
      console.error("Error submitting kudo:", error);
    }
  };


useEffect(() => {
  const fetchUsers = async () => {
    try {
      // console.log("Giver ID", user.uid);
      const response = await axios.get(`/users?userId=${giverId}`);
      console.log("Users List", response.data);
      setUsersList(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchUsers();
}, [giverId]);


  return (
    <div>
      <NavBar />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: "16px",
          backgroundColor: "#ffffff",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="giver-select-label">Select Giver</InputLabel>
          <Select
            labelId="giver-select-label"
            value={receiverId}
            label="Select Giver"
            onChange={(e) => setReceiverId(e.target.value)}
            required
          >
            {usersList.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Write a Kudo"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        {/* TODO: Uncomment this once the image saving is setup in firebase storage in node.js */}
        {/* <Button
          variant="contained"
          component="label"
          style={{ backgroundColor: "#e60023", color: "#ffffff" }}
        >
          Upload Image
          <input type="file" hidden onChange={handleImageUpload} />
        </Button> */}
        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: "#e60023", color: "#ffffff" }}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default KudosSubmissionPage;
