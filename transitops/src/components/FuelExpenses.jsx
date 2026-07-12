import React, { useState } from 'react';
import { Fuel, DollarSign } from 'lucide-react';

export default function FuelExpenses({ vehicles, fuelLogs, setFuelLogs, expenses, setExpenses }) {
  const [newFuel, setNewFuel] = useState({ vehicleId: '', liters: '', cost: '' });
  const [newExpense, setNewExpense] = useState({ vehicleId: '', type: 'Tolls', cost: '' });

  const handleAddFuel = (e) => {
    e.preventDefault();
    setFuelLogs([...fuelLogs, { ...newFuel, id: 'f_' + Date.now(), liters: Number(newFuel.liters), cost: Number(newFuel.cost), date: new Date().toISOString().split('T')[0] }]);
    setNewFuel({ vehicleId: '', liters: '', cost: '' });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    setExpenses([...expenses, { ...newExpense, id: 'e_' + Date.now(), cost: Number(newExpense.cost), date: new Date().toISOString().split('T')[0] }]);
    setNewExpense({ vehicleId: '', type: 'Tolls', cost: '' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
      <div className="bg-[#0a0e1a] p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2"><Fuel size={14} className="text-emerald-400"/> Record Fuel Log</h3>
        <form onSubmit={handleAddFuel} className="space-y-3 text-xs">
          <select required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300" value={newFuel.vehicleId} onChange={e => setNewFuel({...newFuel, vehicleId: e.target.value})}>
            <option value="">-- Choose Asset --</option>
            {vehicles.map(v => <option key={v.id} value={v.id}>{v.regNo} ({v.model})</option>)}
          </select>
          <input type="number" required placeholder="Liters Dispensed" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3" value={newFuel.liters} onChange={e => setNewFuel({...newFuel, liters: e.target.value})} />
          <input type="number" required placeholder="Cost Outlay ($)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3" value={newFuel.cost} onChange={e => setNewFuel({...newFuel, cost: e.target.value})} />
          <button type="submit" className="w-full bg-emerald-600 font-bold p-3 rounded-xl text-white">Commit Fuel Record</button>
        </form>
      </div>

      <div className="bg-[#0a0e1a] p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2"><DollarSign size={14} className="text-blue-400"/> Record General Expense</h3>
        <form onSubmit={handleAddExpense} className="space-y-3 text-xs">
          <select required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300" value={newExpense.vehicleId} onChange={e => setNewExpense({...newExpense, vehicleId: e.target.value})}>
            <option value="">-- Choose Asset --</option>
            {vehicles.map(v => <option key={v.id} value={v.id}>{v.regNo} ({v.model})</option>)}
          </select>
          <input type="text" required placeholder="Expense Type (e.g. Tolls)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3" value={newExpense.type} onChange={e => setNewExpense({...newExpense, type: e.target.value})} />
          <input type="number" required placeholder="Cost ($)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3" value={newExpense.cost} onChange={e => setNewExpense({...newExpense, cost: e.target.value})} />
          <button type="submit" className="w-full bg-blue-600 font-bold p-3 rounded-xl text-white">Commit Expense Log</button>
        </form>
      </div>
    </div>
  );
}