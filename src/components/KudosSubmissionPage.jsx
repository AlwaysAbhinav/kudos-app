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
  const [query, setQuery] = useState(""); // Search query
  const [suggestions, setSuggestions] = useState([]); // Suggestions array
  

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      try {
        const response = await axios.get(
          `/search?q=${value}`
        );
        console.log("Suggestions:", response.data);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  }
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
    console.log("Receiver ID:", receiverId);
    console.log("Giver ID:", giverId);
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
        <input
        type="text"
        placeholder="Select Giver"
        value={query}
        onChange={handleSearch}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          border: "1px solid #ccc",
          borderTop: "none",
          borderRadius: "0 0 4px 4px",
          maxHeight: "150px",
          overflowY: "auto",
        }}
      >

        {suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            style={{
              padding: "8px",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
            }}
            onClick={() => {
              setQuery(suggestion.name);
              console.log("Receiver ID:", suggestion.id);
              setReceiverId(suggestion.id);
              setSuggestions([]); // Clear suggestions after selection
            }}
          >
            {suggestion.name}
          </li>
        ))}
      </ul>
          {/* <InputLabel id="giver-select-label">Select Giver</InputLabel>
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
          </Select> */}
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
