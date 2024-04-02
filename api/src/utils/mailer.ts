/* Author: Jay Rana */

import nodemailer from 'nodemailer';

// Async function to send emails via Gmail.
export const sendEmail = async (to: string, subject: string, body: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  // Setting up email options: sender, recipient, subject, and body.
  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: to,
    subject: subject,
    text: body,
  };

  await transporter.sendMail(mailOptions);
};
