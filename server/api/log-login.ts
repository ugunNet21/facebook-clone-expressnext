// server/api/log-login.ts
import { sendLoginEmail } from '../utils/send-login-email';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    // Kirim email log login
    await sendLoginEmail(username);

    res.status(200).json({ message: "Login email sent successfully" });
  } catch (error) {
    console.error("Error in log-login handler:", error);
    res.status(500).json({ message: "Failed to send login email" });
  }
}