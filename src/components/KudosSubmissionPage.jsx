import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const KudosSubmissionPage = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ text, image });
  };

  return (
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
      <TextField
        label="Write a Kudo"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        variant="contained"
        component="label"
        style={{ backgroundColor: "#e60023", color: "#ffffff" }}
      >
        Upload Image
        <input type="file" hidden onChange={handleImageUpload} />
      </Button>
      <Button
        type="submit"
        variant="contained"
        style={{ backgroundColor: "#e60023", color: "#ffffff" }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default KudosSubmissionPage;
