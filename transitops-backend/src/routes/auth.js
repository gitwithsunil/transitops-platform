import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/index.js';

const router = Router();

// POST /api/auth/login
// Body: { email, password, role }
// Mirrors the frontend's LoginGate triple-check (email + password + role must all match),
// but with a real hashed password check instead of a plaintext client array.
router.post('/login', (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Please select an authorized system role profile, and provide email and password.' });
  }

  const user = db.prepare('SELECT * FROM users WHERE lower(email) = lower(?)').get(email.trim());

  if (!user || user.role !== role || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid authorization pairing. Please verify email, password, and assigned role match.' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
  );

  res.json({
    token,
    user: { id: user.id, email: user.email, role: user.role },
  });
});

// GET /api/auth/me — validate a token and return the current session
router.get('/me', (req, res) => {
  // lightweight inline check so this route doesn't need the shared middleware
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'No token provided.' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ user: payload });
  } catch {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
});

export default router;
