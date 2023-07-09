const express = require("express");
const {
  authenticateJWT,
  getGoogleProfile,
  googleCallback,
  signJWT,
} = require("./middlewares/authentication");
require("dotenv").config();

const { PORT } = process.env;
const app = express();

// Routes

// Google OAuth2 login
app.get("/auth/google", getGoogleProfile);

// Google OAuth2 callback
app.get("/secret", googleCallback, signJWT);

// Protected endpoint
app.get("/protected", authenticateJWT, (req, res) => {
  // Accessible only with a valid JWT token
  res.send("You have accessed the protected endpoint.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
