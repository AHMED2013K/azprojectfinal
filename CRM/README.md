# EduGrowth Outsourcing CRM

Production-style SaaS CRM built with React, Vite, Express, MongoDB, JWT auth, Tailwind CSS, and Socket.io.

## Features

- Secure JWT authentication with admin and commercial roles
- Lead management with search, filters, pagination, import, export, notes, and status pipeline
- Public invite links for self-submitted leads
- Real-time internal chat with presence updates
- Employee tracking with start, pause, resume, and end-of-day logs
- Admin announcements and notification feed
- Dark mode SaaS interface with responsive layout

## Local setup

1. Copy `.env.example` to `.env`
2. Start MongoDB locally
3. Install dependencies with `npm install --legacy-peer-deps`
4. Run the app with `npm run dev`

The frontend runs on `http://localhost:5173` and the API runs on `http://localhost:4000`.

## Seeded accounts

- Admin: `admin@edugrowth.com` / `Admin123!`
- Commercial: `agent@edugrowth.com` / `Agent123!`

These values can be changed in `.env` before first startup.

## Scripts

- `npm run dev` starts frontend and backend together
- `npm run client` starts Vite only
- `npm run server` starts Express only
- `npm run build` builds the frontend
- `npm run start` starts the backend in production mode
- `npm run test` runs the automated test suite

## Docker

You can also run the stack with Docker:

```bash
docker compose up --build
```

## Production Notes

- CSRF protection is enabled for authenticated state-changing requests through the `X-CSRF-Token` header and matching cookie.
- Refresh-token rotation is enabled with secure cookie support in production mode.
- Reverse-proxy and service files are available in [deploy/nginx.conf](/home/ahmed/Bureau/edugrowth/CRM/deploy/nginx.conf), [deploy/edugrowth-main-app-redirect.conf](/home/ahmed/Bureau/edugrowth/CRM/deploy/edugrowth-main-app-redirect.conf), and [deploy/edugrowth-crm.service](/home/ahmed/Bureau/edugrowth/CRM/deploy/edugrowth-crm.service).
- The recommended setup is:
  `app.edugrowth.tn` as the primary private CRM URL
  `edugrowth.tn/app` redirected to `https://app.edugrowth.tn`
- For production, set `CLIENT_URL=https://app.edugrowth.tn` in `.env`.
- The Nginx config adds `X-Robots-Tag: noindex, nofollow` so the CRM stays out of search engines.
