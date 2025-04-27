// server/utils/send-login-email.ts
import nodemailer from 'nodemailer';

export async function sendLoginEmail(username: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SENDER, // Gunakan akun email yang aman
        pass: process.env.EMAIL_PASS, // Gunakan password yang aman
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_SENDER,
      subject: "User  Login Attempt",
      text: `A user just logged in:\n\nUsername/Email: ${username}\nTime: ${new Date().toLocaleString()}`,
    });

    console.log("Login email sent successfully.");
  } catch (error) {
    console.error("Failed to send login email:", error);
    throw new Error("Failed to send login email.");
  }
}