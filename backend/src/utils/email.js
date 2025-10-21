import nodemailer from "nodemailer";

export const sendOTPEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
    connectionTimeout: 20000,
  });

  await transporter.sendMail({
    from: `"Auth Support" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
