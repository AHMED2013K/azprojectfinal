import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const allowedOrigins = (process.env.PUBLIC_ALLOWED_ORIGINS || 'http://localhost:5176,https://edugrowth.tn,https://www.edugrowth.tn')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

app.disable('x-powered-by');
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: false,
}));
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origin not allowed by CORS'));
  },
}));
app.use(express.json());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 25,
  standardHeaders: true,
  legacyHeaders: false,
}));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '..')));

// API routes
app.post('/api/contact', async (req, res) => {
  const name = String(req.body?.name || '').trim();
  const email = String(req.body?.email || '').trim().toLowerCase();
  const organization = String(req.body?.organization || '').trim();
  const message = String(req.body?.message || '').trim();
  if (!name || !email || !organization || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (message.length > 5000 || name.length > 120 || organization.length > 160 || email.length > 160) {
    return res.status(400).json({ error: 'Invalid input length' });
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
      html: `<h3>B2B Contact Form</h3><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Organization:</strong> ${escapeHtml(organization)}</p><p><strong>Message:</strong><br/>${escapeHtml(message)}</p>`
    });

    return res.json({ status: 'success', messageId: info.messageId });
  } catch (err) {
    console.error('Mail error:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

// SPA fallback: return index.html for any non-API GET request so client-side routes work on refresh/direct access.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const PORT = process.env.PORT || process.env.API_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
