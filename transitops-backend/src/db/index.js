import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import 'dotenv/config';

const dbPath = process.env.DB_PATH || './data/transitops.db';
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

export const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ==========================================
// Schema — mirrors the exact data shapes the
// TransitOps frontend keeps in React state
// ==========================================
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Fleet Manager', 'Driver', 'Safety Officer', 'Financial Analyst')),
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS vehicles (
  id TEXT PRIMARY KEY,
  regNo TEXT UNIQUE NOT NULL,
  model TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Van', 'Heavy Truck', 'Semi')),
  maxCap INTEGER NOT NULL,
  odometer INTEGER NOT NULL DEFAULT 0,
  cost REAL NOT NULL DEFAULT 0,
  revenue REAL NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'On Trip', 'In Shop')),
  imgUrl TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS drivers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  license TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL DEFAULT 'Commercial CDL',
  expiry TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 100 CHECK (score BETWEEN 0 AND 100),
  status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'On Trip')),
  avatarUrl TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS trips (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  dest TEXT NOT NULL,
  vehicleId TEXT NOT NULL REFERENCES vehicles(id),
  driverId TEXT NOT NULL REFERENCES drivers(id),
  weight REAL NOT NULL,
  distance REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'Dispatched' CHECK (status IN ('Dispatched', 'Completed')),
  created_at TEXT DEFAULT (datetime('now')),
  completed_at TEXT
);

CREATE TABLE IF NOT EXISTS maintenance_logs (
  id TEXT PRIMARY KEY,
  vehicleId TEXT NOT NULL REFERENCES vehicles(id),
  issue TEXT NOT NULL,
  cost REAL NOT NULL,
  date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Closed'))
);

CREATE TABLE IF NOT EXISTS fuel_logs (
  id TEXT PRIMARY KEY,
  vehicleId TEXT NOT NULL REFERENCES vehicles(id),
  liters REAL NOT NULL,
  cost REAL NOT NULL,
  date TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY,
  vehicleId TEXT NOT NULL REFERENCES vehicles(id),
  type TEXT NOT NULL,
  cost REAL NOT NULL,
  date TEXT NOT NULL
);
`);

export default db;
