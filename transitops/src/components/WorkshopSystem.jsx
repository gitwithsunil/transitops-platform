import React, { useState } from 'react';
import { Wrench } from 'lucide-react';

export default function WorkshopSystem({ vehicles, setVehicles, maintenanceLogs, setMaintenanceLogs }) {
  const [newMaint, setNewMaint] = useState({ vehicleId: '', issue: '', cost: '' });

  const handleOpenMaintenance = (e) => {
    e.preventDefault();
    const vehicle = vehicles.find(v => v.id === newMaint.vehicleId);
    if (!vehicle || vehicle.status === 'On Trip') return;

    setMaintenanceLogs([...maintenanceLogs, { ...newMaint, id: 'm_' + Date.now(), cost: Number(newMaint.cost), date: new Date().toISOString().split('T')[0], status: 'Active' }]);
    setVehicles(vehicles.map(v => v.id === vehicle.id ? { ...v, status: 'In Shop' } : v));
    setNewMaint({ vehicleId: '', issue: '', cost: '' });
  };

  const handleCloseMaintenance = (logId) => {
    const log = maintenanceLogs.find(m => m.id === logId);
    setVehicles(vehicles.map(v => v.id === log.vehicleId ? { ...v, status: 'Available' } : v));
    setMaintenanceLogs(maintenanceLogs.map(m => m.id === logId ? { ...m, status: 'Closed' } : m));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-96 bg-[#0a0e1a] p-6 rounded-2xl border border-slate-800 h-fit space-y-4 shadow-xl">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2"><Wrench size={14} /> Log Workshop Order</h3>
          <form onSubmit={handleOpenMaintenance} className="space-y-3.5 text-xs">
            <select required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300" value={newMaint.vehicleId} onChange={e => setNewMaint({...newMaint, vehicleId: e.target.value})}>
              <option value="">-- Choose Unit Asset --</option>
              {vehicles.filter(v => v.status !== 'On Trip').map(v => <option key={v.id} value={v.id}>{v.regNo} ({v.model})</option>)}
            </select>
            <input type="text" required placeholder="Fault Issue Manifest" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200" value={newMaint.issue} onChange={e => setNewMaint({...newMaint, issue: e.target.value})} />
            <input type="number" required placeholder="Outlay Cost ($)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3" value={newMaint.cost} onChange={e => setNewMaint({...newMaint, cost: e.target.value})} />
            <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold p-3 rounded-xl">Route Asset to Shop</button>
          </form>
        </div>

        <div className="flex-1 bg-[#0a0e1a] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#101626] text-slate-400 font-bold uppercase tracking-widest text-[9px]">
                <th className="p-4">Asset Code</th>
                <th className="p-4">Fault Description</th>
                <th className="p-4">Cost</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {maintenanceLogs.map(log => {
                const unit = vehicles.find(v => v.id === log.vehicleId);
                return (
                  <tr key={log.id} className="text-slate-300">
                    <td className="p-4 font-mono font-bold text-emerald-400">{unit?.regNo}</td>
                    <td className="p-4 font-bold text-slate-200">{log.issue}</td>
                    <td className="p-4 font-mono">${log.cost}</td>
                    <td className="p-4"><span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border text-amber-500">{log.status}</span></td>
                    <td className="p-4 text-center">
                      {log.status === 'Active' && <button onClick={() => handleCloseMaintenance(log.id)} className="bg-slate-900 border hover:text-emerald-400 px-3 py-1 rounded-xl">Release</button>}
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