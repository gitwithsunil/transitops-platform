import React, { useState } from 'react';
import { 
  LayoutDashboard, Truck, Users, ArrowLeftRight, Wrench, 
  Fuel, TrendingUp, Navigation, Plus, Trash2, AlertTriangle, Award, DollarSign, Shield, Menu, X, LogOut, Lock, Mail, UserCheck
} from 'lucide-react';

// ==========================================
// 1. CORRECTED AUTHENTICATION / LOGIN COMPONENT
// ==========================================
function LoginGate({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); 
  const [error, setError] = useState('');

  // Roles perfectly mapped to the official document specification (Fleet Manager, Driver, Safety Officer, Financial Analyst)
  const credentialsDb = [
    { email: 'manager@transitops.com', password: 'password', role: 'Fleet Manager' },
    { email: 'dispatch@transitops.com', password: 'password', role: 'Driver' }, // Fixed role name from "Dispatcher" to "Driver"
    { email: 'safety@transitops.com', password: 'password', role: 'Safety Officer' },
    { email: 'finance@transitops.com', password: 'password', role: 'Financial Analyst' },
  ];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!role) {
      setError('Please select an authorized system role profile.');
      return;
    }
    
    // Exact triple-check matching email, password, and the assigned role matching the document
    const user = credentialsDb.find(u => 
      u.email.toLowerCase() === email.toLowerCase().trim() && 
      u.password === password && 
      u.role === role
    );

    if (user) {
      onLoginSuccess(user);
    } else {
      setError('Invalid authorization pairing. Please verify email, password, and assigned role match.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050811] flex items-center justify-center p-4 font-sans antialiased text-slate-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent_60%)] pointer-events-none" />
      
      <div className="w-full max-w-md bg-[#0a0e1a] border border-slate-800/80 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-black shadow-xl mx-auto text-lg">TO</div>
          <h1 className="text-2xl font-black tracking-tight text-white mt-4">TransitOps Core Auth</h1>
          <p className="text-xs text-slate-400">Smart Logistics Lifecycle Control Platform</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex gap-2 animate-fadeIn">
            <AlertTriangle size={14} className="shrink-0 mt-0.5" /> <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          {/* 1. SELECT ASSIGNED ROLE */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Target Access Profile (Role)</label>
            <div className="relative">
              <UserCheck className="absolute left-3 top-3.5 text-slate-500" size={14} />
              <select 
                required 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500 text-slate-300 font-medium transition-all appearance-none"
                value={role} 
                onChange={e => setRole(e.target.value)}
              >
                <option value="">-- Choose Assigned System Role --</option>
                <option value="Fleet Manager">Fleet Manager</option>
                <option value="Driver">Driver (Dispatch Authority)</option>
                <option value="Safety Officer">Safety Officer</option>
                <option value="Financial Analyst">Financial Analyst</option>
              </select>
            </div>
          </div>

          {/* 2. SECURITY PROFILE EMAIL */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Security Profile Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-slate-500" size={14} />
              <input 
                type="email" required placeholder="name@transitops.com" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500 text-slate-200 font-medium transition-all"
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* 3. ACCESS TOKEN / PASSWORD */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Access token / Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-slate-500" size={14} />
              <input 
                type="password" required placeholder="••••••••" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500 text-slate-200 font-medium transition-all"
                value={password} onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold p-3.5 rounded-xl shadow-lg shadow-emerald-950/20 text-xs tracking-wider uppercase transition-all mt-2">
            Login
          </button>
        </form>

        <div className="bg-slate-950/60 rounded-2xl border border-slate-900 p-4 space-y-1.5 text-[11px] text-slate-500">
          <p className="font-bold text-slate-400 uppercase text-[9px] tracking-wider mb-1">Demo Environment Passports:</p>
          <p>• Role: <strong className="text-slate-300">Fleet Manager</strong> | <code className="text-emerald-400">manager@transitops.com</code></p>
          <p>• Role: <strong className="text-slate-300">Driver</strong> | <code className="text-emerald-400">dispatch@transitops.com</code></p>
          <p>• Role: <strong className="text-slate-300">Safety Officer</strong> | <code className="text-emerald-400">safety@transitops.com</code></p>
          <p>• Role: <strong className="text-slate-300">Financial Analyst</strong> | <code className="text-emerald-400">finance@transitops.com</code></p>
          <p className="text-[10px] text-amber-500 pt-1 font-medium">※ All accounts utilize the password token: <code className="font-bold">password</code></p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. SIDEBAR COMPONENT (RBAC CONTROLLER)
// ==========================================
function Sidebar({ activeTab, setActiveTab, userRole, userEmail, isOpen, setIsOpen, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Control', icon: LayoutDashboard, roles: ['Fleet Manager', 'Financial Analyst'] },
    { id: 'vehicles', label: 'Fleet Registry', icon: Truck, roles: ['Fleet Manager'] },
    { id: 'drivers', label: 'Operator Roster', icon: Users, roles: ['Fleet Manager', 'Safety Officer', 'Driver'] },
    { id: 'trips', label: 'Dispatch Center', icon: ArrowLeftRight, roles: ['Fleet Manager', 'Driver'] },
    { id: 'maintenance', label: 'Workshop System', icon: Wrench, roles: ['Fleet Manager'] },
    { id: 'accounting', label: 'Fuel & Expenses', icon: Fuel, roles: ['Fleet Manager', 'Financial Analyst'] }
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsOpen(false)} />}

      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-[#0a0e1a] border-r border-slate-800/80 p-6 flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0 shrink-0 h-full
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="space-y-8">
          <div className="flex items-center justify-between px-1.5">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg">TO</div>
              <div>
                <h1 className="font-extrabold text-md text-white tracking-wide">TransitOps</h1>
                <p className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">Smart Fleet Platform</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-white bg-slate-900 rounded-xl border border-slate-800"><X size={18} /></button>
          </div>

          <nav className="flex flex-col gap-1.5">
            {filteredMenu.map(item => {
              const Icon = item.icon;
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsOpen(false); }}
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

        <div className="space-y-3">
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center gap-3 overflow-hidden">
            <Shield size={16} className="text-emerald-400 shrink-0" />
            <div className="overflow-hidden">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider truncate">{userEmail}</p>
              <p className="text-xs text-white font-black truncate">{userRole}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800/80 hover:bg-red-950/20 text-slate-400 hover:text-red-400 font-bold text-xs uppercase tracking-wider transition-all"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>
    </>
  );
}

// ==========================================
// 3. DASHBOARD COMPONENT
// ==========================================
function Dashboard({ vehicles, trips, fuelLogs, maintenanceLogs, expenses }) {
  const activeCount = vehicles.filter(v => v.status === 'On Trip').length;
  const availCount = vehicles.filter(v => v.status === 'Available').length;
  const shopCount = vehicles.filter(v => v.status === 'In Shop').length;
  const utilizationRate = Math.round((activeCount / vehicles.length) * 100) || 0;

  const getVehicleCosts = (vehicleId) => {
    const fuelCost = fuelLogs.filter(f => f.vehicleId === vehicleId).reduce((sum, f) => sum + f.cost, 0);
    const maintCost = maintenanceLogs.filter(m => m.vehicleId === vehicleId).reduce((sum, m) => sum + m.cost, 0);
    const genExp = expenses.filter(e => e.vehicleId === vehicleId).reduce((sum, e) => sum + e.cost, 0);
    return fuelCost + maintCost + genExp;
  };

  return (
    <div className="space-y-6 lg:space-y-8 animate-fadeIn">
      <div className="bg-gradient-to-br from-[#0c1224] to-[#090e1a] p-6 rounded-3xl border border-slate-800/80 shadow-2xl">
        <h2 className="text-lg lg:text-xl font-black text-white">Operational Diagnostics Console</h2>
        <p className="text-slate-400 text-xs mt-0.5">Live fleet telemetry rule validation execution engine.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Asset Utilization', value: `${utilizationRate}%`, desc: 'Active Fleet En-Route', accent: 'text-emerald-400', icon: TrendingUp },
          { label: 'Available Fleet Units', value: availCount, desc: 'Ready for Dispatch', accent: 'text-blue-400', icon: Truck },
          { label: 'Vehicles In Workshop', value: shopCount, desc: 'Locked In-Shop Status', accent: 'text-amber-500', icon: Wrench },
          { label: 'Active Trips', value: trips.filter(t => t.status === 'Dispatched').length, desc: 'Manifest Transit Points', accent: 'text-purple-400', icon: Navigation }
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

      <div className="bg-[#0a0e1a] border border-slate-800 rounded-3xl p-4 lg:p-6 space-y-4">
        <h3 className="font-bold text-xs uppercase tracking-widest text-slate-300">Vehicle Cost Performance & Financial ROI Trackers</h3>
        <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
          <table className="w-full text-left border-collapse text-xs whitespace-nowrap lg:whitespace-normal">
            <thead>
              <tr className="bg-[#101626] border-b border-slate-800 text-slate-400 font-bold uppercase tracking-widest text-[9px]">
                <th className="p-4">Asset Code</th>
                <th className="p-4">Operational Costs</th>
                <th className="p-4">Gross Revenue</th>
                <th className="p-4">Net Performance ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {vehicles.map(v => {
                const totalOpCost = getVehicleCosts(v.id);
                const calculatedROI = v.cost > 0 ? (((v.revenue - totalOpCost) / v.cost) * 100).toFixed(2) : '0.00';
                return (
                  <tr key={v.id} className="text-slate-300 hover:bg-slate-800/20">
                    <td className="p-4 font-bold text-white font-mono">{v.regNo} ({v.model})</td>
                    <td className="p-4 text-red-400 font-mono">${totalOpCost.toLocaleString()}</td>
                    <td className="p-4 text-emerald-400 font-mono">${v.revenue.toLocaleString()}</td>
                    <td className={`p-4 font-bold font-mono ${Number(calculatedROI) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{calculatedROI}%</td>
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

// ==========================================
// 4. VEHICLE REGISTRY COMPONENT
// ==========================================
function VehicleRegistry({ vehicles, setVehicles }) {
  const [newVehicle, setNewVehicle] = useState({ regNo: '', model: '', type: 'Heavy Truck', maxCap: '', odometer: '', cost: '' });

  const handleCreateVehicle = (e) => {
    e.preventDefault();
    if (vehicles.some(v => v.regNo.toLowerCase() === newVehicle.regNo.toLowerCase())) {
      alert("Violation: Vehicle registration number must be unique.");
      return;
    }
    const defaultImg = "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80";
    setVehicles([...vehicles, { 
      ...newVehicle, id: 'v_' + Date.now(), maxCap: Number(newVehicle.maxCap), odometer: Number(newVehicle.odometer), cost: Number(newVehicle.cost), revenue: 0, status: 'Available', imgUrl: defaultImg 
    }]);
    setNewVehicle({ regNo: '', model: '', type: 'Heavy Truck', maxCap: '', odometer: '', cost: '' });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="w-full lg:w-96 bg-[#0a0e1a] p-6 rounded-2xl border border-slate-800 h-fit space-y-4 shadow-xl">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2"><Plus size={14} /> Register Fleet Asset</h4>
          <form onSubmit={handleCreateVehicle} className="space-y-3 text-xs">
            <input type="text" required placeholder="Registration Code (e.g. Van-05)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:outline-none text-slate-200 font-mono" value={newVehicle.regNo} onChange={e => setNewVehicle({...newVehicle, regNo: e.target.value})} />
            <input type="text" required placeholder="Asset Model Name" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:outline-none" value={newVehicle.model} onChange={e => setNewVehicle({...newVehicle, model: e.target.value})} />
            <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300" value={newVehicle.type} onChange={e => setNewVehicle({...newVehicle, type: e.target.value})}>
              <option value="Van">Cargo Van</option>
              <option value="Heavy Truck">Heavy Truck</option>
              <option value="Semi">Semi Trailer</option>
            </select>
            <input type="number" required placeholder="Max Weight Capacity (kg)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:outline-none" value={newVehicle.maxCap} onChange={e => setNewVehicle({...newVehicle, maxCap: e.target.value})} />
            <input type="number" required placeholder="Current Odometer (km)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:outline-none" value={newVehicle.odometer} onChange={e => setNewVehicle({...newVehicle, odometer: e.target.value})} />
            <input type="number" required placeholder="Acquisition Cost ($)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:outline-none" value={newVehicle.cost} onChange={e => setNewVehicle({...newVehicle, cost: e.target.value})} />
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3 rounded-xl shadow-md">Register Asset Unit</button>
          </form>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 h-fit">
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

// ==========================================
// 5. OPERATOR ROSTER COMPONENT
// ==========================================
function DriverRoster({ drivers, setDrivers, userRole }) {
  const [newDriver, setNewDriver] = useState({ name: '', license: '', category: 'Commercial CDL', expiry: '', score: 100, avatarUrl: '' });
  const canModify = userRole === 'Fleet Manager';

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
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {canModify ? (
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
        ) : (
          <div className="w-full lg:w-80 bg-slate-950/40 p-5 rounded-2xl border border-slate-800/40 h-fit text-xs text-slate-400">
            <p className="font-bold text-slate-300 uppercase text-[10px] tracking-widest mb-1">Access Notice</p>
            Onboarding features locked. Your role context (<span className="text-emerald-400 font-mono font-bold">{userRole}</span>) is cleared for read-only telemetry audits.
          </div>
        )}
        
        <div className="flex-1 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Active Operator Compliance Roster ({drivers.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <p className="text-xs text-slate-400 font-mono">{driver.license}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800/60 text-xs font-medium">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Safety Index</span>
                      <span className="text-emerald-400 font-bold font-mono flex items-center gap-1"><Award size={12}/> {driver.score}/100</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">License Expiry</span>
                      <span className={`font-mono flex items-center gap-1 ${isExpired ? 'text-red-400':'text-slate-300'}`}>{driver.expiry}</span>
                    </div>
                  </div>
                  {canModify && (
                    <div className="flex justify-end">
                      <button onClick={() => setDrivers(drivers.filter(d => d.id !== driver.id))} className="text-slate-500 hover:text-red-400 text-xs flex items-center gap-1"><Trash2 size={13} /> Remove</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. DISPATCH CENTER COMPONENT
// ==========================================
function DispatchCenter({ vehicles, setVehicles, drivers, setDrivers, trips, setTrips }) {
  const [newTrip, setNewTrip] = useState({ source: '', dest: '', vehicleId: '', driverId: '', weight: '', distance: '' });
  const [validationError, setValidationError] = useState('');

  const handleCreateTrip = (e) => {
    e.preventDefault();
    setValidationError('');
    const vehicle = vehicles.find(v => v.id === newTrip.vehicleId);
    const driver = drivers.find(d => d.id === newTrip.driverId);
    if (!vehicle || !driver) return;
    if (Number(newTrip.weight) > vehicle.maxCap) {
      setValidationError(`Error: Cargo weight violates unit ${vehicle.regNo} capacity (${vehicle.maxCap} kg).`);
      return;
    }
    setTrips([...trips, { ...newTrip, id: 't_' + Date.now(), status: 'Dispatched', weight: Number(newTrip.weight), distance: Number(newTrip.distance) }]);
    setVehicles(vehicles.map(v => v.id === vehicle.id ? { ...v, status: 'On Trip' } : v));
    setDrivers(drivers.map(d => d.id === driver.id ? { ...d, status: 'On Trip' } : d));
    setNewTrip({ source: '', dest: '', vehicleId: '', driverId: '', weight: '', distance: '' });
  };

  const handleCompleteTrip = (tripId) => {
    const trip = trips.find(t => t.id === tripId);
    const calculatedRevenue = trip.distance * 3.5;
    setVehicles(vehicles.map(v => v.id === trip.vehicleId ? { ...v, status: 'Available', revenue: v.revenue + calculatedRevenue } : v));
    setDrivers(drivers.map(d => d.id === trip.driverId ? { ...d, status: 'Available' } : d));
    setTrips(trips.map(t => t.id === tripId ? { ...t, status: 'Completed' } : t));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 animate-fadeIn">
      <div className="bg-[#0a0e1a] p-6 rounded-3xl border border-slate-800/80 h-fit space-y-4 shadow-2xl">
        <h3 className="text-xs font-bold text-white uppercase">Authorize Manifest Dispatch</h3>
        {validationError && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex gap-2">
            <AlertTriangle size={14} className="shrink-0" /> <span>{validationError}</span>
          </div>
        )}
        <form onSubmit={handleCreateTrip} className="space-y-3 text-xs">
          <input type="text" required placeholder="Origin Hub" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:outline-none" value={newTrip.source} onChange={e => setNewTrip({...newTrip, source: e.target.value})} />
          <input type="text" required placeholder="Destination Depot" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:outline-none" value={newTrip.dest} onChange={e => setNewTrip({...newTrip, dest: e.target.value})} />
          <input type="number" required placeholder="Payload Cargo Weight (kg)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:outline-none" value={newTrip.weight} onChange={e => setNewTrip({...newTrip, weight: e.target.value})} />
          <input type="number" required placeholder="Calculated Distance (km)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:outline-none" value={newTrip.distance} onChange={e => setNewTrip({...newTrip, distance: e.target.value})} />
          <select required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300" value={newTrip.vehicleId} onChange={e => setNewTrip({...newTrip, vehicleId: e.target.value})}>
            <option value="">-- Choose Asset Unit --</option>
            {vehicles.filter(v => v.status === 'Available').map(v => <option key={v.id} value={v.id}>{v.regNo} ({v.model})</option>)}
          </select>
          <select required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300" value={newTrip.driverId} onChange={e => setNewTrip({...newTrip, driverId: e.target.value})}>
            <option value="">-- Assign Checked Operator --</option>
            {drivers.filter(d => d.status === 'Available').map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <button type="submit" className="w-full bg-emerald-600 font-bold p-3 rounded-xl flex items-center justify-center gap-2"><Navigation size={14}/> Authorize Route</button>
        </form>
      </div>
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Active Operational Log Manifest</h3>
        {trips.map(trip => (
          <div key={trip.id} className="bg-[#0a0e1a] p-5 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row justify-between sm:items-center text-xs gap-4 shadow-md">
            <div>
              <p className="font-black text-sm text-white">{trip.source} ➔ {trip.dest}</p>
              <p className="text-slate-400 text-[11px] mt-1">Cargo Weight: <strong>{trip.weight} kg</strong> | Distance Metric: <strong>{trip.distance} km</strong></p>
            </div>
            {trip.status === 'Dispatched' ? (
              <button onClick={() => handleCompleteTrip(trip.id)} className="bg-slate-900 border border-slate-800 hover:text-emerald-400 px-3 py-1.5 rounded-xl font-bold w-full sm:w-auto">Finalize Route</button>
            ) : (
              <span className="px-2.5 py-1 text-[10px] bg-slate-950 rounded-lg text-slate-500 uppercase border border-slate-900 text-center w-full sm:w-auto">{trip.status}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 7. WORKSHOP SYSTEM COMPONENT
// ==========================================
function WorkshopSystem({ vehicles, setVehicles, maintenanceLogs, setMaintenanceLogs }) {
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
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="w-full lg:w-96 bg-[#0a0e1a] p-6 rounded-2xl border border-slate-800 h-fit space-y-4 shadow-xl">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2"><Wrench size={14} /> Log Repair Order</h3>
          <form onSubmit={handleOpenMaintenance} className="space-y-3.5 text-xs">
            <select required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300" value={newMaint.vehicleId} onChange={e => setNewMaint({...newMaint, vehicleId: e.target.value})}>
              <option value="">-- Select Damaged Unit --</option>
              {vehicles.filter(v => v.status !== 'On Trip').map(v => <option key={v.id} value={v.id}>{v.regNo} ({v.model})</option>)}
            </select>
            <input type="text" required placeholder="Issue Manifest" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200" value={newMaint.issue} onChange={e => setNewMaint({...newMaint, issue: e.target.value})} />
            <input type="number" required placeholder="Repair Budget Outlay ($)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3" value={newMaint.cost} onChange={e => setNewMaint({...newMaint, cost: e.target.value})} />
            <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold p-3 rounded-xl">Route Asset to Shop</button>
          </form>
        </div>
        <div className="flex-1 bg-[#0a0e1a] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs whitespace-nowrap lg:whitespace-normal">
              <thead>
                <tr className="bg-[#101626] text-slate-400 font-bold uppercase tracking-widest text-[9px]">
                  <th className="p-4">Asset Code</th>
                  <th className="p-4">Fault Description</th>
                  <th className="p-4">Outlay</th>
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
                        {log.status === 'Active' && <button onClick={() => handleCloseMaintenance(log.id)} className="bg-slate-900 border hover:text-emerald-400 px-3 py-1 rounded-xl">Release Unit</button>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. FUEL EXPENSES COMPONENT
// ==========================================
function FuelExpenses({ vehicles, fuelLogs, setFuelLogs, expenses, setExpenses }) {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 animate-fadeIn">
      <div className="bg-[#0a0e1a] p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2"><Fuel size={14} className="text-emerald-400"/> Log Fuel Receipt</h3>
        <form onSubmit={handleAddFuel} className="space-y-3 text-xs">
          <select required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300" value={newFuel.vehicleId} onChange={e => setNewFuel({...newFuel, vehicleId: e.target.value})}>
            <option value="">-- Choose Target Unit --</option>
            {vehicles.map(v => <option key={v.id} value={v.id}>{v.regNo} ({v.model})</option>)}
          </select>
          <input type="number" required placeholder="Liters Dispensed" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3" value={newFuel.liters} onChange={e => setNewFuel({...newFuel, liters: e.target.value})} />
          <input type="number" required placeholder="Cost Outlay ($)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3" value={newFuel.cost} onChange={e => setNewFuel({...newFuel, cost: e.target.value})} />
          <button type="submit" className="w-full bg-emerald-600 font-bold p-3 rounded-xl text-white">Log Fuel Intake</button>
        </form>
      </div>
      <div className="bg-[#0a0e1a] p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2"><DollarSign size={14} className="text-blue-400"/> Log Auxiliary Expense</h3>
        <form onSubmit={handleAddExpense} className="space-y-3 text-xs">
          <select required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300" value={newExpense.vehicleId} onChange={e => setNewExpense({...newExpense, vehicleId: e.target.value})}>
            <option value="">-- Choose Target Unit --</option>
            {vehicles.map(v => <option key={v.id} value={v.id}>{v.regNo} ({v.model})</option>)}
          </select>
          <input type="text" required placeholder="Expense Description (e.g. Tolls)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3" value={newExpense.type} onChange={e => setNewExpense({...newExpense, type: e.target.value})} />
          <input type="number" required placeholder="Cost ($)" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3" value={newExpense.cost} onChange={e => setNewExpense({...newExpense, cost: e.target.value})} />
          <button type="submit" className="w-full bg-blue-600 font-bold p-3 rounded-xl text-white">Log Expense Charge</button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 9. MASTER SYSTEM ORCHESTRATOR FRAME
// ==========================================
export default function App() {
  const [session, setSession] = useState(null); 
  const [activeTab, setActiveTab] = useState('drivers'); 
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  const [vehicles, setVehicles] = useState([
    { id: 'v1', regNo: 'Van-05', model: 'Ford Transit Cargo e-Van', type: 'Van', maxCap: 500, odometer: 12000, cost: 35000, revenue: 8000, status: 'Available', imgUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80' },
    { id: 'v2', regNo: 'Truck-02', model: 'Volvo FH16 Globetrotter', type: 'Heavy Truck', maxCap: 15000, odometer: 85000, cost: 110000, revenue: 24000, status: 'In Shop', imgUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80' },
    { id: 'v3', regNo: 'Semi-09', model: 'Scania R500 Streamline', type: 'Semi', maxCap: 20000, odometer: 43000, cost: 95000, revenue: 31000, status: 'On Trip', imgUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80' }
  ]);

  const [drivers, setDrivers] = useState([
    { id: 'd1', name: 'Alex Rivera', license: 'DL-98234', category: 'Heavy Class-A', expiry: '2028-11-12', score: 98, status: 'Available', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
    { id: 'd2', name: 'Marcus Vance', license: 'DL-44129', category: 'Commercial CDL', expiry: '2027-03-15', score: 82, status: 'On Trip', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' }
  ]);

  const [trips, setTrips] = useState([
    { id: 't1', source: 'Logistics Center West', dest: 'Regional Distribution Hub', vehicleId: 'v3', driverId: 'd2', weight: 14500, distance: 340, status: 'Dispatched' }
  ]);
  const [maintenanceLogs, setMaintenanceLogs] = useState([
    { id: 'm1', vehicleId: 'v2', issue: 'Hydraulic Valve Calibration', cost: 1200, date: '2026-07-10', status: 'Active' }
  ]);
  const [fuelLogs, setFuelLogs] = useState([
    { id: 'f1', vehicleId: 'v1', liters: 80, cost: 120, date: '2026-07-01' }
  ]);
  const [expenses, setExpenses] = useState([]);

  if (!session) {
    return <LoginGate onLoginSuccess={(user) => {
      setSession(user);
      if (user.role === 'Financial Analyst') setActiveTab('dashboard');
      else if (user.role === 'Safety Officer') setActiveTab('drivers');
      else if (user.role === 'Driver') setActiveTab('trips');
      else setActiveTab('drivers');
    }} />;
  }

  return (
    <div className="flex h-screen bg-[#050811] text-slate-200 overflow-hidden font-sans relative">
      
      <Sidebar 
        activeTab={activeTab} setActiveTab={setActiveTab} 
        userRole={session.role} userEmail={session.email}
        isOpen={sidebarOpen} setIsOpen={setSidebarOpen} 
        onLogout={() => setSession(null)}
      />
      
      <div className="flex-1 flex flex-col min-w-0 h-full">
        
        <header className="flex lg:hidden items-center justify-between p-4 bg-[#0a0e1a] border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-xl">
              <Menu size={20} />
            </button>
            <span className="text-xs font-black tracking-widest text-white uppercase">TransitOps</span>
          </div>
          <span className="px-2.5 py-1 text-[9px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-md uppercase tracking-wider">
            {activeTab}
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-slate-900/10 to-[#050811]">
          {activeTab === 'dashboard' && <Dashboard vehicles={vehicles} trips={trips} fuelLogs={fuelLogs} maintenanceLogs={maintenanceLogs} expenses={expenses} />}
          {activeTab === 'vehicles' && <VehicleRegistry vehicles={vehicles} setVehicles={setVehicles} />}
          {activeTab === 'drivers' && <DriverRoster drivers={drivers} setDrivers={setDrivers} userRole={session.role} />}
          {activeTab === 'trips' && <DispatchCenter vehicles={vehicles} setVehicles={setVehicles} drivers={drivers} setDrivers={setDrivers} trips={trips} setTrips={setTrips} />}
          {activeTab === 'maintenance' && <WorkshopSystem vehicles={vehicles} setVehicles={setVehicles} maintenanceLogs={maintenanceLogs} setMaintenanceLogs={setMaintenanceLogs} />}
          {activeTab === 'accounting' && <FuelExpenses vehicles={vehicles} fuelLogs={fuelLogs} setFuelLogs={setFuelLogs} expenses={expenses} setExpenses={setExpenses} />}
        </main>
      </div>

    </div>
  );
}