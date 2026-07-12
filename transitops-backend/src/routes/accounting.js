import { Router } from 'express';
import { db } from '../db/index.js';
import { requireRole } from '../middleware/auth.js';

const router = Router();

// All routes here map to the "accounting" tab: Fleet Manager & Financial Analyst

// ---------- Fuel logs ----------
router.get('/fuel', requireRole('accounting'), (req, res) => {
  res.json(db.prepare('SELECT * FROM fuel_logs ORDER BY date DESC').all());
});

router.post('/fuel', requireRole('accounting'), (req, res) => {
  const { vehicleId, liters, cost } = req.body;
  if (!vehicleId || liters == null || cost == null) {
    return res.status(400).json({ error: 'vehicleId, liters, and cost are required.' });
  }
  const vehicle = db.prepare('SELECT id FROM vehicles WHERE id = ?').get(vehicleId);
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found.' });

  const id = 'f_' + Date.now();
  const date = new Date().toISOString().split('T')[0];
  db.prepare(
    `INSERT INTO fuel_logs (id, vehicleId, liters, cost, date) VALUES (?, ?, ?, ?, ?)`
  ).run(id, vehicleId, Number(liters), Number(cost), date);

  res.status(201).json(db.prepare('SELECT * FROM fuel_logs WHERE id = ?').get(id));
});

// ---------- General expenses ----------
router.get('/expenses', requireRole('accounting'), (req, res) => {
  res.json(db.prepare('SELECT * FROM expenses ORDER BY date DESC').all());
});

router.post('/expenses', requireRole('accounting'), (req, res) => {
  const { vehicleId, type, cost } = req.body;
  if (!vehicleId || !type || cost == null) {
    return res.status(400).json({ error: 'vehicleId, type, and cost are required.' });
  }
  const vehicle = db.prepare('SELECT id FROM vehicles WHERE id = ?').get(vehicleId);
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found.' });

  const id = 'e_' + Date.now();
  const date = new Date().toISOString().split('T')[0];
  db.prepare(
    `INSERT INTO expenses (id, vehicleId, type, cost, date) VALUES (?, ?, ?, ?, ?)`
  ).run(id, vehicleId, type, Number(cost), date);

  res.status(201).json(db.prepare('SELECT * FROM expenses WHERE id = ?').get(id));
});

export default router;
