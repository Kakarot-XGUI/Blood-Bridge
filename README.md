# Blood Bridge

Blood Bridge is a MERN foundation for coordinating hospital blood requests, participating blood banks, monitored transport, and authorized operations teams.

## Current foundation

- Express + Mongoose API with secure cookie JWT sessions, rate limiting, Helmet, CORS, and Socket.IO.
- Tenant-aware organization and administrator models for super admins, hospitals, blood banks, and public request users.
- Database-backed hospitals, blood banks, assignments, QR references, blood requests, inventory, clinical workflow records, shipments, telemetry, alerts, notifications, audit logs, and settings.
- Idempotent request creation, request routing to the current assignment, authenticated administration endpoints, and validated IoT ingestion using the same 2–4°C development range.
- React/Tailwind operations workspace with live activity, transport overview, and a connected request-intake form.

## Run locally

1. Start MongoDB locally (or set `MONGO_URI` to a hosted MongoDB deployment).
2. Copy `backend/.env` to your environment and replace development secrets.
3. Run `npm install` in both `backend` and `frontend`.
4. Run `npm run dev` in `backend`, then `npm run dev -- --host` in `frontend`.
5. Run `npm test` in `backend` for the isolated HTTP authorization and route-contract suite.

The API runs at `http://localhost:5000`; the UI runs at the Vite URL (normally `http://localhost:5173`).

## Architecture and workflow

The API is split into `routes`, `middleware`, `models`, `services` (planned), `jobs` (planned), and integrations. Organization IDs are resolved server-side and are never trusted from a role-bearing frontend. Request statuses begin at `submitted`, proceed through review/acceptance, sample and compatibility verification, dispatch, transit, and delivery; shortage forwarding is represented by `forwarded`, and failed/no-stock outcomes remain explicit.

Reservations expire after 30 minutes unless advanced to allocation by the shipment workflow. The backend worker releases expired reservations and checks stale telemetry every 60 seconds in development; run the worker as a supervised backend process in production. Forwarding uses the hospital's verified GeoJSON location, excludes every bank already present in routing history, and checks unexpired compatible inventory before selecting the next bank.

MongoDB transactions require a replica set or MongoDB Atlas deployment. A standalone local MongoDB process can run reads and basic development flows but cannot safely provide the reservation transaction guarantees required for concurrent production allocation.

This project uses synthetic development records only. Regulatory, clinical, privacy, transport, notification, payment, and device-security requirements must be reviewed and configured by qualified professionals before deployment.
