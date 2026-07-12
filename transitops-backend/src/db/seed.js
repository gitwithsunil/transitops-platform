import bcrypt from 'bcryptjs';
import { db } from './index.js';

// Exactly the 4 demo accounts hardcoded in the frontend's LoginGate component,
// now backed by real hashed passwords instead of a plaintext client-side array.
const demoUsers = [
  { id: 'u_manager', email: 'manager@transitops.com', password: 'password', role: 'Fleet Manager' },
  { id: 'u_driver', email: 'dispatch@transitops.com', password: 'password', role: 'Driver' },
  { id: 'u_safety', email: 'safety@transitops.com', password: 'password', role: 'Safety Officer' },
  { id: 'u_finance', email: 'finance@transitops.com', password: 'password', role: 'Financial Analyst' },
];

const demoVehicles = [
  { id: 'v1', regNo: 'Van-05', model: 'Ford Transit Cargo e-Van', type: 'Van', maxCap: 500, odometer: 12000, cost: 35000, revenue: 8000, status: 'Available', imgUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80' },
  { id: 'v2', regNo: 'Truck-02', model: 'Volvo FH16 Globetrotter', type: 'Heavy Truck', maxCap: 15000, odometer: 85000, cost: 110000, revenue: 24000, status: 'In Shop', imgUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80' },
  { id: 'v3', regNo: 'Semi-09', model: 'Scania R500 Streamline', type: 'Semi', maxCap: 20000, odometer: 43000, cost: 95000, revenue: 31000, status: 'On Trip', imgUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80' },
];

const demoDrivers = [
  { id: 'd1', name: 'Alex Rivera', license: 'DL-98234', category: 'Heavy Class-A', expiry: '2028-11-12', score: 98, status: 'Available', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
  { id: 'd2', name: 'Marcus Vance', license: 'DL-44129', category: 'Commercial CDL', expiry: '2027-03-15', score: 82, status: 'On Trip', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
];

const demoTrips = [
  { id: 't1', source: 'Logistics Center West', dest: 'Regional Distribution Hub', vehicleId: 'v3', driverId: 'd2', weight: 14500, distance: 340, status: 'Dispatched' },
];

const demoMaintenance = [
  { id: 'm1', vehicleId: 'v2', issue: 'Hydraulic Valve Calibration', cost: 1200, date: '2026-07-10', status: 'Active' },
];

const demoFuel = [
  { id: 'f1', vehicleId: 'v1', liters: 80, cost: 120, date: '2026-07-01' },
];

function seed() {
  const insertUser = db.prepare(
    'INSERT OR IGNORE INTO users (id, email, password_hash, role) VALUES (?, ?, ?, ?)'
  );
  for (const u of demoUsers) {
    const hash = bcrypt.hashSync(u.password, 10);
    insertUser.run(u.id, u.email, hash, u.role);
  }

  const insertVehicle = db.prepare(
    `INSERT OR IGNORE INTO vehicles (id, regNo, model, type, maxCap, odometer, cost, revenue, status, imgUrl)
     VALUES (@id, @regNo, @model, @type, @maxCap, @odometer, @cost, @revenue, @status, @imgUrl)`
  );
  for (const v of demoVehicles) insertVehicle.run(v);

  const insertDriver = db.prepare(
    `INSERT OR IGNORE INTO drivers (id, name, license, category, expiry, score, status, avatarUrl)
     VALUES (@id, @name, @license, @category, @expiry, @score, @status, @avatarUrl)`
  );
  for (const d of demoDrivers) insertDriver.run(d);

  const insertTrip = db.prepare(
    `INSERT OR IGNORE INTO trips (id, source, dest, vehicleId, driverId, weight, distance, status)
     VALUES (@id, @source, @dest, @vehicleId, @driverId, @weight, @distance, @status)`
  );
  for (const t of demoTrips) insertTrip.run(t);

  const insertMaint = db.prepare(
    `INSERT OR IGNORE INTO maintenance_logs (id, vehicleId, issue, cost, date, status)
     VALUES (@id, @vehicleId, @issue, @cost, @date, @status)`
  );
  for (const m of demoMaintenance) insertMaint.run(m);

  const insertFuel = db.prepare(
    `INSERT OR IGNORE INTO fuel_logs (id, vehicleId, liters, cost, date)
     VALUES (@id, @vehicleId, @liters, @cost, @date)`
  );
  for (const f of demoFuel) insertFuel.run(f);

  console.log('✅ Seed complete: 4 demo users, 3 vehicles, 2 drivers, 1 trip, 1 maintenance log, 1 fuel log.');
  console.log('   Demo logins (all use password "password"):');
  demoUsers.forEach(u => console.log(`   - ${u.role.padEnd(18)} ${u.email}`));
}

seed();
