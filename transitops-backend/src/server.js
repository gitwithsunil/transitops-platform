import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import './db/index.js'; // ensures schema is created on boot
import { authenticate } from './middleware/auth.js';

import authRoutes from './routes/auth.js';
import vehicleRoutes from './routes/vehicles.js';
import driverRoutes from './routes/drivers.js';
import tripRoutes from './routes/trips.js';
import maintenanceRoutes from './routes/maintenance.js';
import accountingRoutes from './routes/accounting.js';
import dashboardRoutes from './routes/dashboard.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'transitops-backend' }));

// Public
app.use('/api/auth', authRoutes);

// Everything below requires a valid JWT
app.use('/api', authenticate);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/accounting', accountingRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: 'Route not found.' }));

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`🚚 TransitOps backend running on http://localhost:${PORT}`);
});
