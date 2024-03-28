// utils/mailer.ts

import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, body: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: to,
    subject: subject,
    text: body,
  };

  await transporter.sendMail(mailOptions);
};
