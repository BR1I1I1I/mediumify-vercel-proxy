import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/webhook/lemon", (req, res) => {
  const event = req.body;
  console.log("Lemon Squeezy webhook event:", event);
  res.status(200).json({ received: true });
});

export default app;
