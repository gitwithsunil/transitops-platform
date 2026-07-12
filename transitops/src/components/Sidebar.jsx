import React, { useState } from 'react';
import { 
  LayoutDashboard, Truck, Users, ArrowLeftRight, Wrench, 
  Fuel, TrendingUp, Navigation, LogIn, Plus, Trash2, AlertTriangle, Award
} from 'lucide-react';

// ==========================================
// COMPONENT 1: SIDEBAR
// ==========================================
function Sidebar({ activeTab, setActiveTab, userRole }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vehicles', label: 'Fleet Registry', icon: Truck },
    { id: 'drivers', label: 'Operator Roster', icon: Users },
    { id: 'trips', label: 'Dispatch Center', icon: ArrowLeftRight },
    { id: 'maintenance', label: 'Workshop System', icon: Wrench },
    { id: 'accounting', label: 'Fuel & Expenses', icon: Fuel }
  ];

  return (
    <aside className="w-72 bg-[#0a0e1a] border-r border-slate-800/80 p-6 flex flex-col justify-between shrink-0 z-30">
      <div className="space-y-8">
        <div className="flex items-center gap-3.5 px-1.5">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg">TO</div>
          <div>
            <h1 className="font-extrabold text-md text-white tracking-wide">TransitOps</h1>
            <p className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">Smart Fleet Platform</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1.5">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                  isSelected ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center gap-3">
        <div className="overflow-hidden">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Credentials</p>
          <p className="text-xs text-white font-bold truncate">{userRole}</p>
        </div>
      </div>
    </aside>
  );
}

// ==========================================
// COMPONENT 2: DRIVER ROSTER
// ==========================================
function DriverRoster({ drivers, setDrivers }) {
  const [newDriver, setNewDriver] = useState({
    name: '', license: '', category: 'Commercial CDL', expiry: '', score: 100, avatarUrl: ''
  });

  const defaultAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
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
        
        {/* Onboarding Form */}
        <div className="w-full lg:w-96 bg-[#0a0e1a] p-6 rounded-3xl border border-slate-800/80 h-fit space-y-4 shadow-xl">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Plus size={14} className="text-emerald-400" /> Onboard New Operator
          </h3>
          <form onSubmit={handleCreateDriver} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Operator Name</label>
              <input type="text" required placeholder="Alex Rivera" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none" value={newDriver.name} onChange={e => setNewDriver({ ...newDriver, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">License Number</label>
              <input type="text" required placeholder="DL-98234" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-slate-200 focus:outline-none" value={newDriver.license} onChange={e => setNewDriver({ ...newDriver, license: e.target.value })} />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">License Expiry Date</label>
              <input type="date" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300 focus:outline-none" value={newDriver.expiry} onChange={e => setNewDriver({ ...newDriver, expiry: e.target.value })} />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">Safety Rating (0-100)</label>
              <input type="number" required min="0" max="100" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none" value={newDriver.score} onChange={e => setNewDriver({ ...newDriver, score: e.target.value })} />
            </div>
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3 rounded-xl shadow-md transition-all mt-2">Add Operator</button>
          </form>
        </div>

        {/* Visual Roster Cards */}
        <div className="flex-1 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Active Operator Roster ({drivers.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {drivers.map(driver => (
              <div key={driver.id} className="bg-[#0a0e1a] rounded-2xl border border-slate-800/80 p-5 shadow-xl flex flex-col justify-between space-y-4">
                <div className="flex items-start gap-4">
                  <img src={driver.avatarUrl} alt={driver.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-700/80 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm">{driver.name}</h4>
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">{driver.status}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">{driver.license} • {driver.category}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800/60 text-xs font-medium">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Safety Index</span>
                    <span className="text-emerald-400 font-bold font-mono flex items-center gap-1"><Award size={12} /> {driver.score}/100</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Expiry Date</span>
                    <span className="text-slate-300 font-mono">{driver.expiry}</span>
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <button onClick={() => setDrivers(drivers.filter(d => d.id !== driver.id))} className="text-slate-500 hover:text-red-400 text-xs flex items-center gap-1"><Trash2 size={13} /> Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// CORE APP WRAPPER SYSTEM
// ==========================================
export default function App() {
  const [userRole, setUserRole] = useState('Fleet Manager');
  const [activeTab, setActiveTab] = useState('drivers');

  const [vehicles] = useState([
    { id: 'v1', regNo: 'Van-05', model: 'Ford Transit Cargo e-Van', type: 'Van', maxCap: 500, odometer: 12000, cost: 35000, revenue: 8000, status: 'Available' }
  ]);

  const [drivers, setDrivers] = useState([
    { id: 'd1', name: 'Alex Rivera', license: 'DL-98234', category: 'Heavy Class-A', expiry: '2028-11-12', score: 98, status: 'Available', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
    { id: 'd2', name: 'Marcus Vance', license: 'DL-44129', category: 'Commercial CDL', expiry: '2027-03-15', score: 82, status: 'Available', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' }
  ]);

  return (
    <div className="flex h-screen bg-[#050811] text-slate-200 overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole} />
      <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-slate-900/10 to-[#050811]">
        {activeTab === 'drivers' && <DriverRoster drivers={drivers} setDrivers={setDrivers} />}
        {activeTab === 'dashboard' && <div className="p-4 text-slate-400">Dashboard UI content preview...</div>}
      </main>
    </div>
  );
}