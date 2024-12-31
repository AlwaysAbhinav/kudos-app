import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e60023", // Pinterest Red
    },
    background: {
      default: "#ffffff", // White background
    },
    text: {
      primary: "#333333", // Dark Gray for primary text
      secondary: "#717171", // Medium Gray for secondary text
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Close to Pinterest's font
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px", // Rounded corners for cards
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Rounded button corners
        },
      },
    },
  },
});

export default theme;
