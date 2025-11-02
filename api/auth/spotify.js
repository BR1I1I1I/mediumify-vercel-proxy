export default async function handler(req, res) {
  const scopes = "user-read-private user-read-email";
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const clientId = process.env.SPOTIFY_CLIENT_ID;

  if (!clientId || !redirectUri) {
    return res.status(500).json({ error: "Missing environment variables" });
  }

  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
    scopes
  )}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return res.redirect(authUrl);
}
