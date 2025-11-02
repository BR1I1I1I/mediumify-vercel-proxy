import axios from "axios";

export default function handler(req, res) {
  if (req.method === "GET") {
    const scopes = "user-read-private user-read-email";
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
      scopes
    )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    return res.redirect(authUrl);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
