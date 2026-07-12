import { Router } from 'express';
import { db } from '../db/index.js';
import { requireRole } from '../middleware/auth.js';

const router = Router();
const DEFAULT_IMG = 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80';

// GET /api/vehicles — any authenticated role that can see the Vehicle Registry, Dispatch, Workshop, or Accounting screens needs this list.
// (Dashboard/Accounting/Trips all read vehicles, so we allow every role — the Fleet-Manager-only restriction applies to writes.)
router.get('/', (req, res) => {
  const vehicles = db.prepare('SELECT * FROM vehicles ORDER BY created_at DESC').all();
  res.json(vehicles);
});

router.get('/:id', (req, res) => {
  const vehicle = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(req.params.id);
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found.' });
  res.json(vehicle);
});

// POST /api/vehicles — Fleet Manager only (matches VehicleRegistry's registration form)
router.post('/', requireRole('vehicles'), (req, res) => {
  const { regNo, model, type, maxCap, odometer, cost } = req.body;

  if (!regNo || !model || !type || maxCap == null || odometer == null || cost == null) {
    return res.status(400).json({ error: 'regNo, model, type, maxCap, odometer, and cost are all required.' });
  }

  const existing = db.prepare('SELECT id FROM vehicles WHERE lower(regNo) = lower(?)').get(regNo);
  if (existing) {
    return res.status(409).json({ error: 'Violation: Vehicle registration number must be unique.' });
  }

  const id = 'v_' + Date.now();
  db.prepare(
    `INSERT INTO vehicles (id, regNo, model, type, maxCap, odometer, cost, revenue, status, imgUrl)
     VALUES (?, ?, ?, ?, ?, ?, ?, 0, 'Available', ?)`
  ).run(id, regNo, model, type, Number(maxCap), Number(odometer), Number(cost), DEFAULT_IMG);

  const created = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(id);
  res.status(201).json(created);
});

// DELETE /api/vehicles/:id — Fleet Manager only
router.delete('/:id', requireRole('vehicles'), (req, res) => {
  const vehicle = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(req.params.id);
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found.' });

  db.prepare('DELETE FROM vehicles WHERE id = ?').run(req.params.id);
  res.status(204).send();
});

export default router;
