import { Router } from 'express';
import { db } from '../db/index.js';
import { requireRole } from '../middleware/auth.js';

const router = Router();

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
];

// GET /api/drivers — Fleet Manager, Safety Officer, and Driver can all view (per Sidebar RBAC)
router.get('/', requireRole('drivers'), (req, res) => {
  const drivers = db.prepare('SELECT * FROM drivers ORDER BY created_at DESC').all();
  res.json(drivers);
});

router.get('/:id', requireRole('drivers'), (req, res) => {
  const driver = db.prepare('SELECT * FROM drivers WHERE id = ?').get(req.params.id);
  if (!driver) return res.status(404).json({ error: 'Driver not found.' });
  res.json(driver);
});

// POST /api/drivers — Fleet Manager only (frontend's canModify = userRole === 'Fleet Manager')
router.post('/', requireRole(['Fleet Manager']), (req, res) => {
  const { name, license, category, expiry, score, avatarUrl } = req.body;

  if (!name || !license || !expiry || score == null) {
    return res.status(400).json({ error: 'name, license, expiry, and score are required.' });
  }
  if (score < 0 || score > 100) {
    return res.status(400).json({ error: 'Safety rating (score) must be between 0 and 100.' });
  }

  const existing = db.prepare('SELECT id FROM drivers WHERE lower(license) = lower(?)').get(license);
  if (existing) {
    return res.status(409).json({ error: 'A driver with this license number already exists.' });
  }

  const id = 'd_' + Date.now();
  const avatar = avatarUrl || DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)];

  db.prepare(
    `INSERT INTO drivers (id, name, license, category, expiry, score, status, avatarUrl)
     VALUES (?, ?, ?, ?, ?, ?, 'Available', ?)`
  ).run(id, name, license, category || 'Commercial CDL', expiry, Number(score), avatar);

  const created = db.prepare('SELECT * FROM drivers WHERE id = ?').get(id);
  res.status(201).json(created);
});

// DELETE /api/drivers/:id — Fleet Manager only
router.delete('/:id', requireRole(['Fleet Manager']), (req, res) => {
  const driver = db.prepare('SELECT * FROM drivers WHERE id = ?').get(req.params.id);
  if (!driver) return res.status(404).json({ error: 'Driver not found.' });

  db.prepare('DELETE FROM drivers WHERE id = ?').run(req.params.id);
  res.status(204).send();
});

export default router;
