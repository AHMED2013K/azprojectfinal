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
const allowedOrigins = (process.env.PUBLIC_ALLOWED_ORIGINS || 'https://edugrowth.tn,https://www.edugrowth.tn')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

// Add localhost only for development
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:5176', 'http://localhost:5175', 'http://localhost:3000');
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function sanitizeHeaderValue(value = '') {
  return String(value).replace(/[\r\n]+/g, ' ').trim();
}

app.disable('x-powered-by');
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: false,
  hsts: { maxAge: 31536000, includeSubDomains: true },
  xContentTypeOptions: true,
  xFrameOptions: { action: 'deny' },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true,
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
      disableFileAccess: true,
      disableUrlAccess: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const info = await transporter.sendMail({
      from: `Edugrowth Outsourcing <${sanitizeHeaderValue(process.env.SMTP_FROM)}>`,
      to: sanitizeHeaderValue(process.env.CONTACT_TO),
      subject: `B2B Contact Form - ${sanitizeHeaderValue(organization)}`,
      text: `Name: ${name}\nEmail: ${email}\nOrganization: ${organization}\nMessage:\n${message}`,
      html: `<h3>B2B Contact Form</h3><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Organization:</strong> ${escapeHtml(organization)}</p><p><strong>Message:</strong><br/>${escapeHtml(message)}</p>`,
      disableFileAccess: true,
      disableUrlAccess: true,
    });

    return res.json({ status: 'success', messageId: info.messageId });
  } catch (err) {
    console.error('Mail error:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

// Lead capture form endpoint - handles student/learner lead submissions
app.post('/api/leads', async (req, res) => {
  const name = String(req.body?.name || '').trim();
  const email = String(req.body?.email || '').trim().toLowerCase();
  const phone = String(req.body?.phone || '').trim();
  const organization = String(req.body?.organization || '').trim();
  const objective = String(req.body?.objective || '').trim();
  const segment = String(req.body?.segment || '').trim();
  const sourcePage = String(req.body?.sourcePage || 'unknown').trim();
  const referrer = String(req.body?.referrer || '').trim();

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields: name, email, phone' });
  }

  if (email.length > 160 || name.length > 120 || phone.length > 20) {
    return res.status(400).json({ error: 'Invalid input length' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      disableFileAccess: true,
      disableUrlAccess: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const leadsEmail = process.env.LEADS_TO || process.env.CONTACT_TO || 'contact@edugrowth.tn';

    const htmlContent = `
      <h2>New Lead Generated</h2>
      <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 10px; font-weight: bold; width: 150px;">Name:</td>
          <td style="padding: 10px;">${escapeHtml(name)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 10px; font-weight: bold;">Email:</td>
          <td style="padding: 10px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 10px; font-weight: bold;">Phone:</td>
          <td style="padding: 10px;"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 10px; font-weight: bold;">Organization:</td>
          <td style="padding: 10px;">${escapeHtml(organization)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 10px; font-weight: bold;">Objective:</td>
          <td style="padding: 10px;">${escapeHtml(objective)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 10px; font-weight: bold;">Segment:</td>
          <td style="padding: 10px;">${escapeHtml(segment)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 10px; font-weight: bold;">Source Page:</td>
          <td style="padding: 10px;">${escapeHtml(sourcePage)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 10px; font-weight: bold;">Referrer:</td>
          <td style="padding: 10px;">${escapeHtml(referrer)}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">Timestamp:</td>
          <td style="padding: 10px;">${new Date().toISOString()}</td>
        </tr>
      </table>
    `;

    const textContent = `
New Lead Generated

Name: ${name}
Email: ${email}
Phone: ${phone}
Organization: ${organization}
Objective: ${objective}
Segment: ${segment}
Source Page: ${sourcePage}
Referrer: ${referrer}
Timestamp: ${new Date().toISOString()}
    `;

    const info = await transporter.sendMail({
      from: `EduGrowth Leads <${sanitizeHeaderValue(process.env.SMTP_FROM)}>`,
      to: sanitizeHeaderValue(leadsEmail),
      subject: `New Lead - ${sanitizeHeaderValue(name)} (${sanitizeHeaderValue(segment)})`,
      text: textContent,
      html: htmlContent,
      disableFileAccess: true,
      disableUrlAccess: true,
      replyTo: sanitizeHeaderValue(email),
    });

    console.log(`Lead email sent: ${info.messageId} - ${email}`);
    return res.json({ status: 'success', messageId: info.messageId, leadId: `lead_${Date.now()}` });
  } catch (err) {
    console.error('Lead submission error:', err);
    return res.status(500).json({ error: 'Failed to submit lead' });
  }
});

// Express 5 no longer accepts bare "*" here; use a named splat param.
// SPA fallback: return index.html for any non-API GET request so client-side routes work on refresh/direct access.
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const PORT = process.env.PORT || process.env.API_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
