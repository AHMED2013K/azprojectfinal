import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, organization, message } = req.body;
  if (!name || !email || !organization || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const info = await transporter.sendMail({
      from: `Edugrowth Outsourcing <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_TO,
      subject: `B2B Contact Form - ${organization}`,
      text: `Name: ${name}\nEmail: ${email}\nOrganization: ${organization}\nMessage:\n${message}`,
      html: `<h3>B2B Contact Form</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Organization:</strong> ${organization}</p><p><strong>Message:</strong><br/>${message}</p>`
    });

    return res.json({ status: 'success', messageId: info.messageId });
  } catch (err) {
    console.error('Mail error:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

const port = process.env.API_PORT || 5000;
app.listen(port);
