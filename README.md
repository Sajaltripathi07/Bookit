Bookit – Travel Experience Booking App

React + Tailwind frontend, Node + Express backend, PostgreSQL (Prisma) database.

## Tech
- Frontend: React (Vite) + TypeScript + TailwindCSS
- Backend: Node.js + Express + TypeScript
- DB: PostgreSQL with Prisma ORM

## Monorepo Structure
```
client/   # React app
server/   # Express API + Prisma
```

## Local Setup

Prerequisites:
- Node 18+
- PostgreSQL 14+

1) Backend
- Create `server/.env` with:
  - `DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/bookit?schema=public`
  - `CORS_ORIGIN=http://localhost:5173`
  - `PORT=4000`
- Install deps and run migrations:
```
cd server
npm i
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run dev
```
Server runs on `http://localhost:4000`. Test `GET /health`.

2) Frontend
```
cd client
npm i
npm run dev
```
Open the Vite URL (usually `http://localhost:5173`).

3) Frontend -> Backend
- If your backend runs elsewhere, set `VITE_API_URL` in `client/.env` to that URL.

## API Endpoints
- GET `/experiences`
- GET `/experiences/:id`
- POST `/bookings` { experienceId, slotId, name, email, promoCode? }
- POST `/promo/validate` { code }

Bookings are capacity-safe with a unique constraint `(slotId, email)` and transactional checks.

## Deployment
- Backend: Render/Railway/Fly/Heroku with Postgres add-on
- Frontend: Vercel/Netlify
- Backend env: `DATABASE_URL`, `PORT`, `CORS_ORIGIN`
- Frontend env: `VITE_API_URL`

## Images
Royalty-free images (Unsplash) used in seeds.

## Notes
- Tailwind design tokens can be tuned in `client/tailwind.config.js` to match Figma exactly.
- Basic form validation included for name and email.


