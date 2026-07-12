import { Router } from 'express';
import { db } from '../db/index.js';
import { requireRole } from '../middleware/auth.js';

const router = Router();

// GET /api/maintenance — Fleet Manager only (per Sidebar RBAC)
router.get('/', requireRole('maintenance'), (req, res) => {
  const logs = db.prepare('SELECT * FROM maintenance_logs ORDER BY date DESC').all();
  res.json(logs);
});

// POST /api/maintenance — Route Asset to Shop
// Replicates WorkshopSystem.handleOpenMaintenance:
//   vehicle must exist and not be 'On Trip'; vehicle -> 'In Shop'; log -> 'Active'
router.post('/', requireRole('maintenance'), (req, res) => {
  const { vehicleId, issue, cost } = req.body;

  if (!vehicleId || !issue || cost == null) {
    return res.status(400).json({ error: 'vehicleId, issue, and cost are required.' });
  }

  const vehicle = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(vehicleId);
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found.' });
  if (vehicle.status === 'On Trip') {
    return res.status(409).json({ error: `Unit ${vehicle.regNo} is currently on a trip and cannot be routed to the shop.` });
  }

  const id = 'm_' + Date.now();
  const date = new Date().toISOString().split('T')[0];

  const openMaintenance = db.transaction(() => {
    db.prepare(
      `INSERT INTO maintenance_logs (id, vehicleId, issue, cost, date, status)
       VALUES (?, ?, ?, ?, ?, 'Active')`
    ).run(id, vehicleId, issue, Number(cost), date);
    db.prepare(`UPDATE vehicles SET status = 'In Shop' WHERE id = ?`).run(vehicleId);
  });
  openMaintenance();

  const created = db.prepare('SELECT * FROM maintenance_logs WHERE id = ?').get(id);
  res.status(201).json(created);
});

// POST /api/maintenance/:id/close — Release Unit
// Replicates WorkshopSystem.handleCloseMaintenance: vehicle -> 'Available'; log -> 'Closed'
router.post('/:id/close', requireRole('maintenance'), (req, res) => {
  const log = db.prepare('SELECT * FROM maintenance_logs WHERE id = ?').get(req.params.id);
  if (!log) return res.status(404).json({ error: 'Maintenance log not found.' });
  if (log.status === 'Closed') {
    return res.status(409).json({ error: 'This maintenance order is already closed.' });
  }

  const closeMaintenance = db.transaction(() => {
    db.prepare(`UPDATE vehicles SET status = 'Available' WHERE id = ?`).run(log.vehicleId);
    db.prepare(`UPDATE maintenance_logs SET status = 'Closed' WHERE id = ?`).run(log.id);
  });
  closeMaintenance();

  const updated = db.prepare('SELECT * FROM maintenance_logs WHERE id = ?').get(log.id);
  res.json(updated);
});

export default router;
