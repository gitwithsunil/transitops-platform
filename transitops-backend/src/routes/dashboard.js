import { Router } from 'express';
import { db } from '../db/index.js';
import { requireRole } from '../middleware/auth.js';

const router = Router();

// GET /api/dashboard — Fleet Manager & Financial Analyst only
// Replicates every calculation from Dashboard.jsx server-side so the frontend
// doesn't need to fetch every table and recompute client-side.
router.get('/', requireRole('dashboard'), (req, res) => {
  const vehicles = db.prepare('SELECT * FROM vehicles').all();
  const trips = db.prepare('SELECT * FROM trips').all();
  const fuelLogs = db.prepare('SELECT * FROM fuel_logs').all();
  const maintenanceLogs = db.prepare('SELECT * FROM maintenance_logs').all();
  const expenses = db.prepare('SELECT * FROM expenses').all();

  const activeCount = vehicles.filter(v => v.status === 'On Trip').length;
  const availCount = vehicles.filter(v => v.status === 'Available').length;
  const shopCount = vehicles.filter(v => v.status === 'In Shop').length;
  const utilizationRate = vehicles.length ? Math.round((activeCount / vehicles.length) * 100) : 0;
  const activeDispatchedTrips = trips.filter(t => t.status === 'Dispatched').length;

  const getVehicleCosts = (vehicleId) => {
    const fuelCost = fuelLogs.filter(f => f.vehicleId === vehicleId).reduce((s, f) => s + f.cost, 0);
    const maintCost = maintenanceLogs.filter(m => m.vehicleId === vehicleId).reduce((s, m) => s + m.cost, 0);
    const genExpense = expenses.filter(e => e.vehicleId === vehicleId).reduce((s, e) => s + e.cost, 0);
    return fuelCost + maintCost + genExpense;
  };

  const getVehicleDistance = (vehicleId) =>
    trips.filter(t => t.vehicleId === vehicleId && t.status === 'Completed').reduce((s, t) => s + t.distance, 0);

  const getVehicleFuelLiters = (vehicleId) =>
    fuelLogs.filter(f => f.vehicleId === vehicleId).reduce((s, f) => s + f.liters, 0);

  const vehicleReport = vehicles.map(v => {
    const totalOpCost = getVehicleCosts(v.id);
    const distanceRun = getVehicleDistance(v.id);
    const litersConsumed = getVehicleFuelLiters(v.id);
    const fuelEfficiencyKmPerL = litersConsumed > 0 ? Number((distanceRun / litersConsumed).toFixed(2)) : 0;
    const roiPercent = v.cost > 0 ? Number((((v.revenue - totalOpCost) / v.cost) * 100).toFixed(2)) : 0;

    return {
      id: v.id,
      regNo: v.regNo,
      model: v.model,
      totalOpCost,
      revenue: v.revenue,
      fuelEfficiencyKmPerL,
      roiPercent,
    };
  });

  res.json({
    cards: {
      assetUtilizationRate: utilizationRate,
      availableFleetUnits: availCount,
      vehiclesInWorkshop: shopCount,
      activeDispatchedTrips,
    },
    vehicleReport,
  });
});

export default router;
