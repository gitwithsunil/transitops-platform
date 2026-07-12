import React, { useState } from 'react';
import { Plus, Trash2, Award, AlertTriangle } from 'lucide-react';

export default function DriverRoster({ drivers, setDrivers }) {
  const [newDriver, setNewDriver] = useState({ name: '', license: '', category: 'Commercial CDL', expiry: '', score: 100, avatarUrl: '' });

  const defaultAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'
  ];

  const handleCreateDriver = (e) => {
    e.preventDefault();
    const randomAvatar = defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];
    setDrivers([
      ...drivers,
      { ...newDriver, id: 'd_' + Date.now(), score: Number(newDriver.score), status: 'Available', avatarUrl: newDriver.avatarUrl || randomAvatar }
    ]);
    setNewDriver({ name: '', license: '', category: 'Commercial CDL', expiry: '', score: 100, avatarUrl: '' });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-96 bg-[#0a0e1a] p-6 rounded-3xl border border-slate-800/80 h-fit space-y-4 shadow-xl">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2"><Plus size={14} className="text-emerald-400" /> Onboard Operator</h3>
          <form onSubmit={handleCreateDriver} className="space-y-3 text-xs">
            <input type="text" required placeholder="Full Name" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none" value={newDriver.name} onChange={e => setNewDriver({ ...newDriver, name: e.target.value })} />
            <input type="text" required placeholder="License Key" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono focus:outline-none" value={newDriver.license} onChange={e => setNewDriver({ ...newDriver, license: e.target.value })} />
            <input type="date" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300 focus:outline-none" value={newDriver.expiry} onChange={e => setNewDriver({ ...newDriver, expiry: e.target.value })} />
            <input type="number" required min="0" max="100" placeholder="Safety Rating" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:outline-none" value={newDriver.score} onChange={e => setNewDriver({ ...newDriver, score: e.target.value })} />
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3 rounded-xl shadow-md transition-all mt-2">Add Operator</button>
          </form>
        </div>

        <div className="flex-1 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Active Operator Roster ({drivers.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {drivers.map(driver => {
              const isExpired = new Date(driver.expiry) < new Date();
              return (
                <div key={driver.id} className="bg-[#0a0e1a] rounded-2xl border border-slate-800/80 p-5 shadow-xl flex flex-col justify-between space-y-4">
                  <div className="flex items-start gap-4">
                    <img src={driver.avatarUrl} alt={driver.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-700/80 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm">{driver.name}</h4>
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase ${driver.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400':'bg-blue-500/10 text-blue-400'}`}>{driver.status}</span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono">{driver.license} • {driver.category}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800/60 text-xs font-medium">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Safety Index</span>
                      <span className="text-emerald-400 font-bold font-mono flex items-center gap-1"><Award size={12}/> {driver.score}/100</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Expiry Date</span>
                      <span className={`font-mono flex items-center gap-1 ${isExpired ? 'text-red-400':'text-slate-300'}`}>{driver.expiry}</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => setDrivers(drivers.filter(d => d.id !== driver.id))} className="text-slate-500 hover:text-red-400 text-xs flex items-center gap-1"><Trash2 size={13} /> Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}