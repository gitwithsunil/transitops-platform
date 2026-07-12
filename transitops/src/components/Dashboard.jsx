import React from 'react';
import { TrendingUp, Truck, Wrench, Navigation } from 'lucide-react';

export default function Dashboard({ vehicles, trips, fuelLogs, maintenanceLogs, expenses }) {
  const activeCount = vehicles.filter(v => v.status === 'On Trip').length;
  const availCount = vehicles.filter(v => v.status === 'Available').length;
  const shopCount = vehicles.filter(v => v.status === 'In Shop').length;
  const utilizationRate = Math.round((activeCount / vehicles.length) * 100) || 0;

  const getVehicleCosts = (vehicleId) => {
    const fuelCost = fuelLogs.filter(f => f.vehicleId === vehicleId).reduce((sum, f) => sum + f.cost, 0);
    const maintCost = maintenanceLogs.filter(m => m.vehicleId === vehicleId).reduce((sum, m) => sum + m.cost, 0);
    const generalExpense = expenses.filter(e => e.vehicleId === vehicleId).reduce((sum, e) => sum + e.cost, 0);
    return fuelCost + maintCost + generalExpense;
  };

  const getVehicleDistance = (vehicleId) => {
    return trips.filter(t => t.vehicleId === vehicleId && t.status === 'Completed').reduce((sum, t) => sum + t.distance, 0);
  };

  const getVehicleFuelLiters = (vehicleId) => {
    return fuelLogs.filter(f => f.vehicleId === vehicleId).reduce((sum, f) => sum + f.liters, 0);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-gradient-to-br from-[#0c1224] to-[#090e1a] p-6 rounded-3xl border border-slate-800/80 shadow-2xl">
        <h2 className="text-xl font-black text-white">Operational Framework Diagnostics</h2>
        <p className="text-slate-400 text-xs mt-0.5">Live fleet telemetry rules engine execution.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Asset Utilization Rate', value: `${utilizationRate}%`, desc: 'Active Fleet En-Route', accent: 'text-emerald-400', icon: TrendingUp },
          { label: 'Available Fleet Units', value: availCount, desc: 'Ready for Dispatch', accent: 'text-blue-400', icon: Truck },
          { label: 'Vehicles In Workshop', value: shopCount, desc: 'Locked In-Shop Status', accent: 'text-amber-500', icon: Wrench },
          { label: 'Active Dispatched Trips', value: trips.filter(t => t.status === 'Dispatched').length, desc: 'Manifest Transit Points', accent: 'text-purple-400', icon: Navigation }
        ].map((card, idx) => {
          const IconComponent = card.icon;
          return (
            <div key={idx} className="bg-[#0a0e1a] p-5 rounded-2xl border border-slate-800/60 shadow-md">
              <div className="flex justify-between items-start">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{card.label}</p>
                <IconComponent size={14} className={card.accent} />
              </div>
              <p className={`text-2xl font-black mt-1 tracking-tight ${card.accent}`}>{card.value}</p>
              <p className="text-[9px] text-slate-500 mt-0.5">{card.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-[#0a0e1a] border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="font-bold text-xs uppercase tracking-widest text-slate-300">System Dynamic Vehicle ROI Tracker & Analytics</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#101626] border-b border-slate-800 text-slate-400 font-bold uppercase tracking-widest text-[9px]">
                <th className="p-4">Asset Code</th>
                <th className="p-4">Total Expenses</th>
                <th className="p-4">Generated Revenue</th>
                <th className="p-4">Fuel Efficiency Index</th>
                <th className="p-4">Strategic Lifetime ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {vehicles.map(v => {
                const totalOpCost = getVehicleCosts(v.id);
                const distanceRun = getVehicleDistance(v.id);
                const litersConsumed = getVehicleFuelLiters(v.id);
                const efficiency = litersConsumed > 0 ? (distanceRun / litersConsumed).toFixed(2) : '0.00';
                const calculatedROI = (((v.revenue - totalOpCost) / v.cost) * 100).toFixed(2);

                return (
                  <tr key={v.id} className="text-slate-300 hover:bg-slate-800/20">
                    <td className="p-4 font-bold text-white font-mono">{v.regNo} ({v.model})</td>
                    <td className="p-4 text-red-400 font-mono">${totalOpCost.toLocaleString()}</td>
                    <td className="p-4 text-emerald-400 font-mono">${v.revenue.toLocaleString()}</td>
                    <td className="p-4 font-mono">{efficiency} km/L</td>
                    <td className={`p-4 font-bold font-mono ${Number(calculatedROI) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {calculatedROI}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}