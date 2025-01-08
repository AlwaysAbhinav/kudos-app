import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

const RequestKudos = ({ open, handleClose, userId, userEmail }) => {
  const [email, setEmail] = useState("");
  const [senderEmail, setSenderEmail] = useState(userEmail);
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    try {
        console.log("Email", email, message, senderEmail);
      await axios.post("/send-email", { email, message, senderEmail });
      alert("Email sent successfully!");
      handleClose();
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

return (
    <Modal open={open} onClose={handleClose}>
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" component="h2">
                    Request Kudos
                </Typography>
                <Button onClick={handleClose} sx={{ minWidth: 'auto' }}>
                    <Typography variant="h6" component="h2">
                        &times;
                    </Typography>
                </Button>
            </Box>
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                // value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextField
                label="Message"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            />
            <Button variant="contained" color="primary" onClick={handleSend}>
                Send
            </Button>
        </Box>
    </Modal>
);
};

export default RequestKudos;