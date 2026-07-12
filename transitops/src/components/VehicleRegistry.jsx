import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function VehicleRegistry({ vehicles, setVehicles }) {
  const [newVehicle, setNewVehicle] = useState({ regNo: '', model: '', type: 'Heavy Truck', maxCap: '', odometer: '', cost: '' });

  const handleCreateVehicle = (e) => {
    e.preventDefault();
    if (vehicles.some(v => v.regNo.toLowerCase() === newVehicle.regNo.toLowerCase())) {
      alert("Violation: Vehicle registration number must be unique.");
      return;
    }
    const defaultImg = "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80";
    setVehicles([...vehicles, { 
      ...newVehicle, 
      id: 'v_' + Date.now(), 
      maxCap: Number(newVehicle.maxCap), 
      odometer: Number(newVehicle.odometer), 
      cost: Number(newVehicle.cost), 
      revenue: 0,
      status: 'Available', 
      imgUrl: defaultImg 
    }]);
    setNewVehicle({ regNo: '', model: '', type: 'Heavy Truck', maxCap: '', odometer: '', cost: '' });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-96 bg-[#0a0e1a] p-6 rounded-2xl border border-slate-800 h-fit space-y-4 shadow-xl">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2"><Plus size={14} /> Add Fleet Asset</h4>
          <form onSubmit={handleCreateVehicle} className="space-y-3 text-xs">
            <input type="text" required placeholder="Registration Code (e.g. Van-05)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-emerald-500 text-slate-200 font-mono" value={newVehicle.regNo} onChange={e => setNewVehicle({...newVehicle, regNo: e.target.value})} />
            <input type="text" required placeholder="Asset Model Name" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:outline-none" value={newVehicle.model} onChange={e => setNewVehicle({...newVehicle, model: e.target.value})} />
            <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300" value={newVehicle.type} onChange={e => setNewVehicle({...newVehicle, type: e.target.value})}>
              <option value="Van">Cargo Van</option>
              <option value="Heavy Truck">Heavy Truck</option>
              <option value="Semi">Semi Trailer</option>
            </select>
            <input type="number" required placeholder="Max Weight Capacity (kg)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:outline-none" value={newVehicle.maxCap} onChange={e => setNewVehicle({...newVehicle, maxCap: e.target.value})} />
            <input type="number" required placeholder="Current Odometer Reading (km)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:outline-none" value={newVehicle.odometer} onChange={e => setNewVehicle({...newVehicle, odometer: e.target.value})} />
            <input type="number" required placeholder="Acquisition Cost ($)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:outline-none" value={newVehicle.cost} onChange={e => setNewVehicle({...newVehicle, cost: e.target.value})} />
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3 rounded-xl shadow-md">Register Asset Unit</button>
          </form>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 h-fit">
          {vehicles.map(v => (
            <div key={v.id} className="bg-[#0a0e1a] rounded-3xl border border-slate-800/80 overflow-hidden shadow-2xl flex flex-col group hover:border-slate-700/60 transition-all">
              <div className="h-40 relative bg-slate-950 overflow-hidden">
                <img src={v.imgUrl} alt={v.model} className="w-full h-full object-cover opacity-65" />
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[9px] uppercase font-bold bg-slate-900 border border-slate-700 text-slate-300">{v.status}</span>
                <div className="absolute bottom-4 left-4">
                  <span className="font-mono text-[9px] bg-slate-950 px-2 py-0.5 rounded text-emerald-400 font-bold border border-slate-800">{v.regNo}</span>
                  <h4 className="text-md font-black text-white mt-1">{v.model}</h4>
                </div>
              </div>
              <div className="p-4 text-xs space-y-2 text-slate-400">
                <div className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span>Load Limit: <strong>{v.maxCap} kg</strong></span>
                  <span>Value: <strong>${v.cost.toLocaleString()}</strong></span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Odometer: <strong>{v.odometer} km</strong></span>
                  <button onClick={() => setVehicles(vehicles.filter(x => x.id !== v.id))} className="text-slate-500 hover:text-red-400 p-1"><Trash2 size={13}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}