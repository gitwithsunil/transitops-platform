# TransitOps Backend

A REST API backend for the **TransitOps** fleet/logistics management frontend, built by reverse-engineering the exact data shapes, RBAC rules, and business logic already implemented in the React app's in-memory state (`App.jsx`, `Dashboard.jsx`, `VehicleRegistry.jsx`, `DriverRoster.jsx`, `DispatchCenter.jsx`, `WorkshopSystem.jsx`, `FuelExpenses.jsx`).

Stack: **Node.js + Express + SQLite (better-sqlite3)**, JWT auth, bcrypt password hashing. No external database server required — it's a single file on disk.

## 1. Setup

```bash
cd transitops-backend
npm install
cp .env.example .env      # edit JWT_SECRET before deploying anywhere real
npm run seed               # creates the DB file and inserts demo data
npm run dev                 # starts on http://localhost:4000 (auto-restart on save)
# or: npm start
```

Health check: `GET http://localhost:4000/health`

## 2. Demo accounts (seeded)

All four accounts from the frontend's `LoginGate` are recreated, now with real bcrypt-hashed passwords server-side instead of a plaintext array shipped to the browser:

| Role | Email | Password |
|---|---|---|
| Fleet Manager | manager@transitops.com | password |
| Driver | dispatch@transitops.com | password |
| Safety Officer | safety@transitops.com | password |
| Financial Analyst | finance@transitops.com | password |

## 3. Auth flow

```
POST /api/auth/login
Body: { "email": "manager@transitops.com", "password": "password", "role": "Fleet Manager" }
→ { "token": "<jwt>", "user": { "id", "email", "role" } }
```

Send the token on every other request:
```
Authorization: Bearer <jwt>
```

`GET /api/auth/me` validates a token and returns the decoded session.

## 4. Role-based access control

Mirrors the frontend `Sidebar`'s `menuItems.roles` matrix exactly:

| Resource | Fleet Manager | Driver | Safety Officer | Financial Analyst |
|---|---|---|---|---|
| `/api/dashboard` | ✅ | – | – | ✅ |
| `/api/vehicles` (read) | ✅ | ✅ | ✅ | ✅ |
| `/api/vehicles` (write/delete) | ✅ | – | – | – |
| `/api/drivers` (read) | ✅ | ✅ | ✅ | – |
| `/api/drivers` (write/delete) | ✅ | – | – | – |
| `/api/trips` | ✅ | ✅ | – | – |
| `/api/maintenance` | ✅ | – | – | – |
| `/api/accounting/*` | ✅ | – | – | ✅ |

Unauthorized roles get `403 Forbidden`. Missing/invalid tokens get `401 Unauthorized`.

## 5. Endpoints

### Vehicles — `VehicleRegistry.jsx`
- `GET /api/vehicles` — list all
- `GET /api/vehicles/:id`
- `POST /api/vehicles` `{ regNo, model, type, maxCap, odometer, cost }` — rejects duplicate `regNo` (409), same as the frontend's alert
- `DELETE /api/vehicles/:id`

### Drivers — `DriverRoster.jsx`
- `GET /api/drivers` — list all
- `GET /api/drivers/:id`
- `POST /api/drivers` `{ name, license, category, expiry, score, avatarUrl? }` — Fleet Manager only, rejects duplicate license, validates `0 ≤ score ≤ 100`, assigns a random default avatar if none supplied
- `DELETE /api/drivers/:id`

### Trips — `DispatchCenter.jsx`
- `GET /api/trips` — list all
- `POST /api/trips` `{ source, dest, vehicleId, driverId, weight, distance }`
  - 404 if vehicle/driver don't exist
  - 409 if vehicle or driver isn't `Available`
  - **422 if `weight > vehicle.maxCap`** — exact validation from `handleCreateTrip`
  - On success: vehicle & driver → `On Trip`, trip → `Dispatched`
- `POST /api/trips/:id/complete`
  - Computes `revenue += distance * 3.5` (identical formula to `handleCompleteTrip`)
  - vehicle & driver → `Available`, trip → `Completed`

### Maintenance — `WorkshopSystem.jsx`
- `GET /api/maintenance`
- `POST /api/maintenance` `{ vehicleId, issue, cost }` — 409 if vehicle is `On Trip`; sets vehicle → `In Shop`
- `POST /api/maintenance/:id/close` — sets vehicle → `Available`, log → `Closed`

### Fuel & Expenses — `FuelExpenses.jsx`
- `GET /api/accounting/fuel`, `POST /api/accounting/fuel` `{ vehicleId, liters, cost }`
- `GET /api/accounting/expenses`, `POST /api/accounting/expenses` `{ vehicleId, type, cost }`

### Dashboard — `Dashboard.jsx`
- `GET /api/dashboard` returns:
  ```json
  {
    "cards": {
      "assetUtilizationRate": 33,
      "availableFleetUnits": 1,
      "vehiclesInWorkshop": 1,
      "activeDispatchedTrips": 1
    },
    "vehicleReport": [
      { "id": "v1", "regNo": "Van-05", "model": "...", "totalOpCost": 120, "revenue": 8000, "fuelEfficiencyKmPerL": 0, "roiPercent": 22.51 }
    ]
  }
  ```
  All four summary cards, per-vehicle cost rollup (fuel + maintenance + expenses), fuel efficiency (km/L, from completed-trip distance ÷ liters), and ROI (`(revenue - totalOpCost) / cost * 100`) — computed exactly as the frontend does client-side, just server-side and pre-aggregated.

## 6. Wiring up the frontend

Replace the React `useState` arrays in `App.jsx` with API calls, e.g.:

```js
const [vehicles, setVehicles] = useState([]);

useEffect(() => {
  fetch(`${API_URL}/api/vehicles`, { headers: { Authorization: `Bearer ${token}` } })
    .then(r => r.json())
    .then(setVehicles);
}, []);
```

And swap `LoginGate`'s local `credentialsDb` check for a real call to `POST /api/auth/login`, storing the returned token (e.g. in memory or `sessionStorage`) and role for the RBAC-gated `Sidebar`.

## 7. Notes & next steps

- **This sandbox has no network access**, so dependencies could not be `npm install`-ed or live-tested here. All source files were syntax-checked with `node --check` and pass. Run `npm install && npm run seed && npm run dev` locally to bring it up — should work out of the box.
- SQLite is fine for a demo/small deployment; swap `better-sqlite3` for `pg`/Postgres if you need concurrent writers at scale (the query shapes translate almost directly).
- Passwords are bcrypt-hashed; there's no self-serve signup endpoint since the frontend only ever offered 4 fixed demo accounts — add a `POST /api/auth/register` (Fleet-Manager-only) if you need to onboard more users.
- No rate limiting or refresh-token rotation yet — add `express-rate-limit` and a refresh flow before any public deployment.
