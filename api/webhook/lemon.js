export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const event = req.body || {};
    // TODO: Burada imza doğrulaması (Lemon Squeezy signature) ekleyebilirsin.
    console.log("Lemon Squeezy webhook event:", event);
    return res.status(200).json({ received: true });
  } catch (err) {
    return res.status(400).json({ error: "Invalid webhook payload" });
  }
}
