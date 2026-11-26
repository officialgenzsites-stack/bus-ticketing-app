# Karnataka Bus Ticketing System

A **full‑stack JavaScript** starter project that demonstrates a digital self‑service ticketing flow for Karnataka state transport buses (KSRTC / BMTC). The focus is on the **user‑facing web/app interface and payment flow**, with a simple Express backend that supplies mock route data and a React front‑end that handles route search, booking, and ticket generation (QR code).

## Why this project?
- **Real‑world problem** – Conductors currently print tickets manually, slowing boarding and creating errors.
- **Inclusive design** – While the core prototype is a web app (VS Code‑friendly), the architecture can be extended later with SMS/USSD or kiosk layers for users without smartphones.
- **College‑ready** – Small enough to complete in a semester, yet showcases modern React, routing, state‑management, and a REST API.

---

## Tech stack
- **Backend** – Node.js + Express (REST API). Dependencies: `express`, `cors`, `uuid`, `nodemon` for development.
- **Frontend** – React 18 with React‑Router‑DOM, bundled via `react-scripts` (Create‑React‑App style). QR code generation uses `qrcode.react`.
- **Languages** – JavaScript (ES6). No TypeScript to keep the learning curve low for beginners.
- **Tooling** – VS Code (recommended), npm scripts for start / dev.

---

## Project structure
```
bus-ticketing-app/
├─ server/                 # Express backend
│   ├─ package.json        # npm dependencies & scripts
│   └─ index.js            # API endpoints (routes, book, ticket)
│
├─ client/                 # React frontend
│   ├─ package.json        # React dependencies
│   ├─ public/
│   │   └─ index.html      # HTML entry point
│   └─ src/
│       ├─ index.js        # ReactDOM bootstrap
│       ├─ index.css       # Global styles (Tailored UI)
│       └─ App.js          # All pages, router, language toggle
│
└─ README.md               # This file
```

---

## Getting started (local development)
1. **Clone / copy** the folder `D:\bus-ticketing-app` to your machine.
2. **Backend**
   ```bash
   cd D:\bus-ticketing-app\server
   npm install            # installs express, cors, uuid, nodemon
   npm run dev            # starts server on http://localhost:5000
   ```
   The server exposes:
   - `GET /api/routes?source=&destination=` – list routes (filterable)
   - `GET /api/routes/:id` – details of a single route
   - `POST /api/book` – create a ticket (returns a mock ticket JSON)
   - `GET /api/ticket/:ticketId` – lookup a ticket (demo fallback)
3. **Frontend**
   ```bash
   cd D:\bus-ticketing-app\client
   npm install            # react, react‑router‑dom, qrcode.react, etc.
   npm start              # opens http://localhost:3000
   ```
   The React dev server proxies API calls to `http://localhost:5000` (via the `proxy` field in `client/package.json`).

4. **Browse** the app:
   - Home page lets you pick *From* and *To* cities (Karnataka list).
   - Choose a bus, fill passenger details, pick a payment method (UPI/Card/Cash) and confirm.
   - A **digital ticket** with QR code appears; you can print or screenshot it for the conductor.

---

## Extending the prototype (future work)
- **SMS/USSD layer** – expose the same booking endpoints via a tiny Flask/Node service that receives a short code, validates, and returns a ticket ID.
- **Kiosk UI** – redesign `client` to run in a fullscreen kiosk mode, add voice prompts (Web Speech API) for illiterate users.
- **Persist data** – replace the in‑memory arrays with a lightweight SQLite or MongoDB database.
- **Auth & payments** – integrate real UPI / Razorpay APIs for production.
- **Admin dashboard** – view bookings, seat availability, and generate reports for the transport authority.

---

## How to submit for a college project
- Include the **project folder** (both `server` and `client`) in a zip file.
- Add a **short report** (2‑3 pages) describing:
  1. The problem statement and why accessibility matters.
  2. Design decisions (tech stack, language toggle, mock data).
  3. Screenshots of each UI step (search, booking, ticket).
  4. Possible extensions (SMS, kiosk, DB).
- Demonstrate the app locally or deploy to a free hosting platform (e.g., Render, Railway) and provide the URL.

---

## License
MIT – feel free to adapt, improve, and share.

---

Happy coding, and best of luck presenting this prototype in your 6th‑semester project!
