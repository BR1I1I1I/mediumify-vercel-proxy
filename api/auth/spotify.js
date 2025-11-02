import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/api/auth/spotify", (req, res) => {
  const scopes = "user-read-private user-read-email";
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
    scopes
  )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  res.redirect(authUrl);
});

app.get("/api/auth/spotify/callback", async (req, res) => {
  const code = req.query.code || null;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: "Failed to authenticate with Spotify" });
  }
});

export default app;
