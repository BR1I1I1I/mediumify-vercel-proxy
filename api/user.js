import express from "express";
const app = express();

app.get("/api/user", (req, res) => {
  res.json({ message: "User endpoint working!" });
});

export default app;
