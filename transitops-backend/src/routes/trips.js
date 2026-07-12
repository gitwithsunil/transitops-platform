import { Router } from 'express';
import { db } from '../db/index.js';
import { requireRole } from '../middleware/auth.js';

const router = Router();

// GET /api/trips — Fleet Manager & Driver (per Sidebar RBAC)
router.get('/', requireRole('trips'), (req, res) => {
  const trips = db.prepare('SELECT * FROM trips ORDER BY created_at DESC').all();
  res.json(trips);
});

// POST /api/trips — Authorize Manifest Dispatch
// Replicates DispatchCenter.handleCreateTrip exactly:
//   1. vehicle & driver must exist
//   2. cargo weight must not exceed vehicle.maxCap
//   3. on success: vehicle -> 'On Trip', driver -> 'On Trip', trip -> 'Dispatched'
router.post('/', requireRole('trips'), (req, res) => {
  const { source, dest, vehicleId, driverId, weight, distance } = req.body;

  if (!source || !dest || !vehicleId || !driverId || weight == null || distance == null) {
    return res.status(400).json({ error: 'source, dest, vehicleId, driverId, weight, and distance are all required.' });
  }

  const vehicle = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(vehicleId);
  const driver = db.prepare('SELECT * FROM drivers WHERE id = ?').get(driverId);

  if (!vehicle || !driver) {
    return res.status(404).json({ error: 'Selected vehicle or driver does not exist.' });
  }
  if (vehicle.status !== 'Available') {
    return res.status(409).json({ error: `Unit ${vehicle.regNo} is not currently available for dispatch.` });
  }
  if (driver.status !== 'Available') {
    return res.status(409).json({ error: `Operator ${driver.name} is not currently available for dispatch.` });
  }
  if (Number(weight) > vehicle.maxCap) {
    return res.status(422).json({ error: `Error: Cargo weight violates unit ${vehicle.regNo} capacity (${vehicle.maxCap} kg).` });
  }

  const id = 't_' + Date.now();

  const createTrip = db.transaction(() => {
    db.prepare(
      `INSERT INTO trips (id, source, dest, vehicleId, driverId, weight, distance, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'Dispatched')`
    ).run(id, source, dest, vehicleId, driverId, Number(weight), Number(distance));

    db.prepare(`UPDATE vehicles SET status = 'On Trip' WHERE id = ?`).run(vehicleId);
    db.prepare(`UPDATE drivers SET status = 'On Trip' WHERE id = ?`).run(driverId);
  });
  createTrip();

  const created = db.prepare('SELECT * FROM trips WHERE id = ?').get(id);
  res.status(201).json(created);
});

// POST /api/trips/:id/complete — Finalize Route
// Replicates DispatchCenter.handleCompleteTrip exactly:
//   revenue += distance * 3.5; vehicle -> 'Available'; driver -> 'Available'; trip -> 'Completed'
router.post('/:id/complete', requireRole('trips'), (req, res) => {
  const trip = db.prepare('SELECT * FROM trips WHERE id = ?').get(req.params.id);
  if (!trip) return res.status(404).json({ error: 'Trip not found.' });
  if (trip.status === 'Completed') {
    return res.status(409).json({ error: 'Trip is already completed.' });
  }

  const calculatedRevenue = trip.distance * 3.5;

  const completeTrip = db.transaction(() => {
    db.prepare(`UPDATE vehicles SET status = 'Available', revenue = revenue + ? WHERE id = ?`)
      .run(calculatedRevenue, trip.vehicleId);
    db.prepare(`UPDATE drivers SET status = 'Available' WHERE id = ?`).run(trip.driverId);
    db.prepare(`UPDATE trips SET status = 'Completed', completed_at = datetime('now') WHERE id = ?`).run(trip.id);
  });
  completeTrip();

  const updated = db.prepare('SELECT * FROM trips WHERE id = ?').get(trip.id);
  res.json(updated);
});

export default router;
