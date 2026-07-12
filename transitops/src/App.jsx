import React, { useState } from 'react';
import { 
  LayoutDashboard, Truck, Users, ArrowLeftRight, Wrench, 
  Fuel, TrendingUp, Navigation, Plus, Trash2, AlertTriangle, Award, DollarSign, Shield, Menu, X, LogOut, Lock, Mail, UserCheck, Sun, Moon
} from 'lucide-react';

// ==========================================
// 1. CORRECTED AUTHENTICATION / LOGIN COMPONENT WITH THEME TOGGLE
// ==========================================
function LoginGate({ onLoginSuccess, darkMode, setDarkMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); 
  const [error, setError] = useState('');

  const credentialsDb = [
    { email: 'manager@transitops.com', password: 'password', role: 'Fleet Manager' },
    { email: 'dispatch@transitops.com', password: 'password', role: 'Driver' },
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
    <div className={`min-h-screen flex items-center justify-center p-4 font-sans antialiased transition-colors duration-300 ${darkMode ? 'bg-[#050811] text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
      {darkMode && <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent_60%)] pointer-events-none" />}
      
      {/* Theme Floating Toggle */}
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-6 right-6 p-3 rounded-xl border transition-all shadow-md ${darkMode ? 'bg-[#0a0e1a] border-slate-800 text-amber-400 hover:text-amber-300' : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900'}`}
        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className={`w-full max-w-md border rounded-3xl p-8 shadow-2xl relative z-10 space-y-6 transition-all ${darkMode ? 'bg-[#0a0e1a] border-slate-800/80' : 'bg-white border-slate-200/80'}`}>
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-black shadow-xl mx-auto text-lg">TO</div>
          <h1 className={`text-2xl font-black tracking-tight mt-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>TransitOps Core Auth</h1>
          <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Smart Logistics Lifecycle Control Platform</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex gap-2 animate-fadeIn">
            <AlertTriangle size={14} className="shrink-0 mt-0.5" /> <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className={`text-[10px] uppercase font-bold tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Target Access Profile (Role)</label>
            <div className="relative">
              <UserCheck className="absolute left-3 top-3.5 text-slate-500" size={14} />
              <select 
                required 
                className={`w-full border rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500 font-medium transition-all appearance-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
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

          <div className="space-y-1.5">
            <label className={`text-[10px] uppercase font-bold tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Security Profile Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-slate-500" size={14} />
              <input 
                type="email" required placeholder="name@transitops.com" 
                className={`w-full border rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500 font-medium transition-all ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={`text-[10px] uppercase font-bold tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Access token / Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-slate-500" size={14} />
              <input 
                type="password" required placeholder="••••••••" 
                className={`w-full border rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500 font-medium transition-all ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                value={password} onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold p-3.5 rounded-xl shadow-lg text-xs tracking-wider uppercase transition-all mt-2">
            Authorize Credentials
          </button>
        </form>

        <div className={`rounded-2xl border p-4 space-y-1.5 text-[11px] ${darkMode ? 'bg-slate-950/60 border-slate-900 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
          <p className={`font-bold uppercase text-[9px] tracking-wider mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>Demo Environment Passports:</p>
          <p>• Role: <strong className={darkMode ? 'text-slate-300' : 'text-slate-800'}>Fleet Manager</strong> | <code className="text-emerald-600 dark:text-emerald-400">manager@transitops.com</code></p>
          <p>• Role: <strong className={darkMode ? 'text-slate-300' : 'text-slate-800'}>Driver</strong> | <code className="text-emerald-600 dark:text-emerald-400">dispatch@transitops.com</code></p>
          <p>• Role: <strong className={darkMode ? 'text-slate-300' : 'text-slate-800'}>Safety Officer</strong> | <code className="text-emerald-600 dark:text-emerald-400">safety@transitops.com</code></p>
          <p>• Role: <strong className={darkMode ? 'text-slate-300' : 'text-slate-800'}>Financial Analyst</strong> | <code className="text-emerald-600 dark:text-emerald-400">finance@transitops.com</code></p>
          <p className="text-[10px] text-amber-600 dark:text-amber-500 pt-1 font-medium">※ All accounts utilize the password token: <code className="font-bold">password</code></p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. SIDEBAR COMPONENT (RBAC CONTROLLER WITH THEME CONFIG)
// ==========================================
function Sidebar({ activeTab, setActiveTab, userRole, userEmail, isOpen, setIsOpen, onLogout, darkMode }) {
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
        fixed inset-y-0 left-0 w-72 p-6 flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out border-r
        lg:static lg:translate-x-0 shrink-0 h-full
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${darkMode ? 'bg-[#0a0e1a] border-slate-800/80' : 'bg-white border-slate-200'}
      `}>
        <div className="space-y-8">
          <div className="flex items-center justify-between px-1.5">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg">TO</div>
              <div>
                <h1 className={`font-extrabold text-md tracking-wide ${darkMode ? 'text-white' : 'text-slate-900'}`}>TransitOps</h1>
                <p className="text-[10px] text-emerald-500 dark:text-emerald-400 font-bold tracking-widest uppercase">Smart Fleet Platform</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className={`lg:hidden p-2 rounded-xl border ${darkMode ? 'text-slate-400 hover:text-white bg-slate-900 border-slate-800' : 'text-slate-600 hover:text-slate-900 bg-slate-50 border-slate-200'}`}><X size={18} /></button>
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
                    isSelected ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl' : darkMode ? 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
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
          <div className={`p-3 rounded-2xl border flex items-center gap-3 overflow-hidden ${darkMode ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
            <Shield size={16} className="text-emerald-500 shrink-0" />
            <div className="overflow-hidden">
              <p className={`text-[9px] font-bold uppercase tracking-wider truncate ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{userEmail}</p>
              <p className={`text-xs font-black truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>{userRole}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all ${darkMode ? 'border-slate-800/80 hover:bg-red-950/20 text-slate-400 hover:text-red-400' : 'border-slate-200 hover:bg-red-50 text-slate-600 hover:text-red-600'}`}
          >
            <LogOut size={14} /> Clear Session
          </button>
        </div>
      </aside>
    </>
  );
}

// ==========================================
// 3. DASHBOARD COMPONENT
// ==========================================
function Dashboard({ vehicles, trips, fuelLogs, maintenanceLogs, expenses, darkMode }) {
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
      <div className={`p-6 rounded-3xl border shadow-2xl ${darkMode ? 'from-[#0c1224] to-[#090e1a] bg-gradient-to-br border-slate-800/80' : 'bg-white border-slate-200'}`}>
        <h2 className={`text-lg lg:text-xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>Operational Diagnostics Console</h2>
        <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Live fleet telemetry rule validation execution engine.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Asset Utilization', value: `${utilizationRate}%`, desc: 'Active Fleet En-Route', accent: 'text-emerald-500', icon: TrendingUp },
          { label: 'Available Fleet Units', value: availCount, desc: 'Ready for Dispatch', accent: 'text-blue-500', icon: Truck },
          { label: 'Vehicles In Workshop', value: shopCount, desc: 'Locked In-Shop Status', accent: 'text-amber-500', icon: Wrench },
          { label: 'Active Trips', value: trips.filter(t => t.status === 'Dispatched').length, desc: 'Manifest Transit Points', accent: 'text-purple-500', icon: Navigation }
        ].map((card, idx) => {
          const IconComponent = card.icon;
          return (
            <div key={idx} className={`p-5 rounded-2xl border shadow-md ${darkMode ? 'bg-[#0a0e1a] border-slate-800/60' : 'bg-white border-slate-200'}`}>
              <div className="flex justify-between items-start">
                <p className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{card.label}</p>
                <IconComponent size={14} className={card.accent} />
              </div>
              <p className={`text-2xl font-black mt-1 tracking-tight ${card.accent}`}>{card.value}</p>
              <p className={`text-[9px] mt-0.5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{card.desc}</p>
            </div>
          );
        })}
      </div>

      <div className={`border rounded-3xl p-4 lg:p-6 space-y-4 ${darkMode ? 'bg-[#0a0e1a] border-slate-800' : 'bg-white border-slate-200'}`}>
        <h3 className={`font-bold text-xs uppercase tracking-widest ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Vehicle Cost Performance & Financial ROI Trackers</h3>
        <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
          <table className="w-full text-left border-collapse text-xs whitespace-nowrap lg:whitespace-normal">
            <thead>
              <tr className={`border-b font-bold uppercase tracking-widest text-[9px] ${darkMode ? 'bg-[#101626] border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                <th className="p-4">Asset Code</th>
                <th className="p-4">Operational Costs</th>
                <th className="p-4">Gross Revenue</th>
                <th className="p-4">Net Performance ROI</th>
              </tr>
            </thead>
            <tbody className={`divide-y font-medium ${darkMode ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
              {vehicles.map(v => {
                const totalOpCost = getVehicleCosts(v.id);
                const calculatedROI = v.cost > 0 ? (((v.revenue - totalOpCost) / v.cost) * 100).toFixed(2) : '0.00';
                return (
                  <tr key={v.id} className={`transition-colors ${darkMode ? 'text-slate-300 hover:bg-slate-800/20' : 'text-slate-700 hover:bg-slate-50'}`}>
                    <td className={`p-4 font-bold font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>{v.regNo} ({v.model})</td>
                    <td className="p-4 text-red-500 font-mono">${totalOpCost.toLocaleString()}</td>
                    <td className="p-4 text-emerald-600 font-mono">${v.revenue.toLocaleString()}</td>
                    <td className={`p-4 font-bold font-mono ${Number(calculatedROI) >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{calculatedROI}%</td>
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
function VehicleRegistry({ vehicles, setVehicles, darkMode }) {
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
        <div className={`w-full lg:w-96 p-6 rounded-2xl border h-fit space-y-4 shadow-xl ${darkMode ? 'bg-[#0a0e1a] border-slate-800' : 'bg-white border-slate-200'}`}>
          <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}><Plus size={14} /> Register Fleet Asset</h4>
          <form onSubmit={handleCreateVehicle} className="space-y-3 text-xs">
            <input type="text" required placeholder="Registration Code (e.g. Van-05)" className={`w-full border rounded-xl p-3 focus:outline-none font-mono ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`} value={newVehicle.regNo} onChange={e => setNewVehicle({...newVehicle, regNo: e.target.value})} />
            <input type="text" required placeholder="Asset Model Name" className={`w-full border rounded-xl p-3 focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`} value={newVehicle.model} onChange={e => setNewVehicle({...newVehicle, model: e.target.value})} />
            <select className={`w-full border rounded-xl p-3 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`} value={newVehicle.type} onChange={e => setNewVehicle({...newVehicle, type: e.target.value})}>
              <option value="Van">Cargo Van</option>
              <option value="Heavy Truck">Heavy Truck</option>
              <option value="Semi">Semi Trailer</option>
            </select>
            <input type="number" required placeholder="Max Weight Capacity (kg)" className={`w-full border rounded-xl p-3 focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`} value={newVehicle.maxCap} onChange={e => setNewVehicle({...newVehicle, maxCap: e.target.value})} />
            <input type="number" required placeholder="Current Odometer (km)" className={`w-full border rounded-xl p-3 focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`} value={newVehicle.odometer} onChange={e => setNewVehicle({...newVehicle, odometer: e.target.value})} />
            <input type="number" required placeholder="Acquisition Cost ($)" className={`w-full border rounded-xl p-3 focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`} value={newVehicle.cost} onChange={e => setNewVehicle({...newVehicle, cost: e.target.value})} />
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3 rounded-xl shadow-md">Register Asset Unit</button>
          </form>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 h-fit">
          {vehicles.map(v => (
            <div key={v.id} className={`rounded-3xl border overflow-hidden shadow-2xl flex flex-col group transition-all ${darkMode ? 'bg-[#0a0e1a] border-slate-800/80 hover:border-slate-700/60' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
              <div className="h-40 relative bg-slate-950 overflow-hidden">
                <img src={v.imgUrl} alt={v.model} className="w-full h-full object-cover opacity-65" />
                <span className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-[9px] uppercase font-bold border ${darkMode ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>{v.status}</span>
                <div className="absolute bottom-4 left-4">
                  <span className={`font-mono text-[9px] px-2 py-0.5 rounded font-bold border ${darkMode ? 'bg-slate-950 text-emerald-400 border-slate-800' : 'bg-white text-emerald-600 border-slate-200'}`}>{v.regNo}</span>
                  <h4 className="text-md font-black text-white mt-1">{v.model}</h4>
                </div>
              </div>
              <div className={`p-4 text-xs space-y-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <div className={`flex justify-between border-b pb-2 ${darkMode ? 'border-slate-800/60' : 'border-slate-100'}`}>
                  <span>Load Limit: <strong>{v.maxCap} kg</strong></span>
                  <span>Value: <strong>${v.cost.toLocaleString()}</strong></span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Odometer: <strong>{v.odometer} km</strong></span>
                  <button onClick={() => setVehicles(vehicles.filter(x => x.id !== v.id))} className="text-slate-400 hover:text-red-500 p-1"><Trash2 size={13}/></button>
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
function DriverRoster({ drivers, setDrivers, userRole, darkMode }) {
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
          <div className={`w-full lg:w-96 p-6 rounded-3xl border h-fit space-y-4 shadow-xl ${darkMode ? 'bg-[#0a0e1a] border-slate-800/80' : 'bg-white border-slate-200'}`}>
            <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}><Plus size={14} className="text-emerald-500" /> Onboard Operator</h3>
            <form onSubmit={handleCreateDriver} className="space-y-3 text-xs">
              <input type="text" required placeholder="Full Name" className={`w-full border rounded-xl p-3 focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`} value={newDriver.name} onChange={e => setNewDriver({ ...newDriver, name: e.target.value })} />
              <input type="text" required placeholder="License Key" className={`w-full border rounded-xl p-3 font-mono focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`} value={newDriver.license} onChange={e => setNewDriver({ ...newDriver, license: e.target.value })} />
              <input type="date" required className={`w-full border rounded-xl p-3 focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'}`} value={newDriver.expiry} onChange={e => setNewDriver({ ...newDriver, expiry: e.target.value })} />
              <input type="number" required min="0" max="100" placeholder="Safety Rating" className={`w-full border rounded-xl p-3 focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`} value={newDriver.score} onChange={e => setNewDriver({ ...newDriver, score: e.target.value })} />
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3 rounded-xl shadow-md transition-all mt-2">Add Operator</button>
            </form>
          </div>
        ) : (
          <div className={`w-full lg:w-80 p-5 rounded-2xl border h-fit text-xs ${darkMode ? 'bg-slate-950/40 border-slate-800/40 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
            <p className={`font-bold uppercase text-[10px] tracking-widest mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>Access Notice</p>
            Onboarding features locked. Your role context (<span className="text-emerald-500 font-mono font-bold">{userRole}</span>) is cleared for read-only telemetry audits.
          </div>
        )}
        
        <div className="flex-1 space-y-4">
          <h3 className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Active Operator Compliance Roster ({drivers.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {drivers.map(driver => {
              const isExpired = new Date(driver.expiry) < new Date();
              return (
                <div key={driver.id} className={`rounded-2xl border p-5 shadow-xl flex flex-col justify-between space-y-4 ${darkMode ? 'bg-[#0a0e1a] border-slate-800/80' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-start gap-4">
                    <img src={driver.avatarUrl} alt={driver.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-700/80 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>{driver.name}</h4>
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase ${driver.status === 'Available' ? 'bg-emerald-500/10 text-emerald-500':'bg-blue-500/10 text-blue-500'}`}>{driver.status}</span>
                      </div>
                      <p className={`text-xs font-mono ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{driver.license}</p>
                    </div>
                  </div>
                  <div className={`grid grid-cols-2 gap-2 p-3 rounded-xl border text-xs font-medium ${darkMode ? 'bg-slate-950 border-slate-800/60' : 'bg-slate-50 border-slate-100'}`}>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Safety Index</span>
                      <span className="text-emerald-500 font-bold font-mono flex items-center gap-1"><Award size={12}/> {driver.score}/100</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">License Expiry</span>
                      <span className={`font-mono flex items-center gap-1 ${isExpired ? 'text-red-500':'text-slate-600 dark:text-slate-300'}`}>{driver.expiry}</span>
                    </div>
                  </div>
                  {canModify && (
                    <div className="flex justify-end">
                      <button onClick={() => setDrivers(drivers.filter(d => d.id !== driver.id))} className="text-slate-400 hover:text-red-500 text-xs flex items-center gap-1"><Trash2 size={13} /> Remove</button>
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
function DispatchCenter({ vehicles, setVehicles, drivers, setDrivers, trips, setTrips, darkMode }) {
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
      <div className={`p-6 rounded-3xl border h-fit space-y-4 shadow-2xl ${darkMode ? 'bg-[#0a0e1a] border-slate-800/80' : 'bg-white border-slate-200'}`}>
        <h3 className={`text-xs font-bold uppercase ${darkMode ? 'text-white' : 'text-slate-800'}`}>Authorize Manifest Dispatch</h3>
        {validationError && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex gap-2">
            <AlertTriangle size={14} className="shrink-0" /> <span>{validationError}</span>
          </div>
        )}
        <form onSubmit={handleCreateTrip} className="space-y-3 text-xs">
          <input type="text" required placeholder="Origin Hub" className={`w-full border rounded-xl p-3 focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`} value={newTrip.source} onChange={e => setNewTrip({...newTrip, source: e.target.value})} />
          <input type="text" required placeholder="Destination Depot" className={`w-full border rounded-xl p-3 focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`} value={newTrip.dest} onChange={e => setNewTrip({...newTrip, dest: e.target.value})} />
          <input type="number" required placeholder="Payload Cargo Weight (kg)" className={`w-full border rounded-xl p-3 focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`} value={newTrip.weight} onChange={e => setNewTrip({...newTrip, weight: e.target.value})} />
          <input type="number" required placeholder="Calculated Distance (km)" className={`w-full border rounded-xl p-3 focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`} value={newTrip.distance} onChange={e => setNewTrip({...newTrip, distance: e.target.value})} />
          <select required className={`w-full border rounded-xl p-3 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`} value={newTrip.vehicleId} onChange={e => setNewTrip({...newTrip, vehicleId: e.target.value})}>
            <option value="">-- Choose Asset Unit --</option>
            {vehicles.filter(v => v.status === 'Available').map(v => <option key={v.id} value={v.id}>{v.regNo} ({v.model})</option>)}
          </select>
          <select required className={`w-full border rounded-xl p-3 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`} value={newTrip.driverId} onChange={e => setNewTrip({...newTrip, driverId: e.target.value})}>
            <option value="">-- Assign Checked Operator --</option>
            {drivers.filter(d => d.status === 'Available').map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <button type="submit" className="w-full bg-emerald-600 font-bold p-3 rounded-xl flex items-center justify-center gap-2 text-white"><Navigation size={14}/> Authorize Route</button>
        </form>
      </div>
      <div className="lg:col-span-2 space-y-4">
        <h3 className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Active Operational Log Manifest</h3>
        {trips.map(trip => (
          <div key={trip.id} className={`p-5 rounded-2xl border flex flex-col sm:flex-row justify-between sm:items-center text-xs gap-4 shadow-md ${darkMode ? 'bg-[#0a0e1a] border-slate-800/80' : 'bg-white border-slate-200'}`}>
            <div>
              <p className={`font-black text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>{trip.source} ➔ {trip.dest}</p>
              <p className={`text-[11px] mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Cargo Weight: <strong>{trip.weight} kg</strong> | Distance Metric: <strong>{trip.distance} km</strong></p>
            </div>
            {trip.status === 'Dispatched' ? (
              <button onClick={() => handleCompleteTrip(trip.id)} className={`border hover:text-emerald-500 px-3 py-1.5 rounded-xl font-bold w-full sm:w-auto ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>Finalize Route</button>
            ) : (
              <span className={`px-2.5 py-1 text-[10px] rounded-lg uppercase text-center w-full sm:w-auto border ${darkMode ? 'bg-slate-950 border-slate-900 text-slate-500' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>{trip.status}</span>
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
function WorkshopSystem({ vehicles, setVehicles, maintenanceLogs, setMaintenanceLogs, darkMode }) {
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
        <div className={`w-full lg:w-96 p-6 rounded-2xl border h-fit space-y-4 shadow-xl ${darkMode ? 'bg-[#0a0e1a] border-slate-800' : 'bg-white border-slate-200'}`}>
          <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}><Wrench size={14} /> Log Repair Order</h3>
          <form onSubmit={handleOpenMaintenance} className="space-y-3.5 text-xs">
            <select required className={`w-full border rounded-xl p-3 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`} value={newMaint.vehicleId} onChange={e => setNewMaint({...newMaint, vehicleId: e.target.value})}>
              <option value="">-- Select Damaged Unit --</option>
              {vehicles.filter(v => v.status !== 'On Trip').map(v => <option key={v.id} value={v.id}>{v.regNo} ({v.model})</option>)}
            </select>
            <input type="text" required placeholder="Issue Manifest" className={`w-full border rounded-xl p-3 focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`} value={newMaint.issue} onChange={e => setNewMaint({...newMaint, issue: e.target.value})} />
            <input type="number" required placeholder="Repair Budget Outlay ($)" className={`w-full border rounded-xl p-3 focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`} value={newMaint.cost} onChange={e => setNewMaint({...newMaint, cost: e.target.value})} />
            <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold p-3 rounded-xl">Route Asset to Shop</button>
          </form>
        </div>
        <div className={`flex-1 border rounded-3xl overflow-hidden shadow-2xl ${darkMode ? 'bg-[#0a0e1a] border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs whitespace-nowrap lg:whitespace-normal">
              <thead>
                <tr className={`font-bold uppercase tracking-widest text-[9px] ${darkMode ? 'bg-[#101626] text-slate-400' : 'bg-slate-50 text-slate-500'}`}>
                  <th className="p-4">Asset Code</th>
                  <th className="p-4">Fault Description</th>
                  <th className="p-4">Outlay</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className={`divide-y font-medium ${darkMode ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                {maintenanceLogs.map(log => {
                  const unit = vehicles.find(v => v.id === log.vehicleId);
                  return (
                    <tr key={log.id} className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                      <td className="p-4 font-mono font-bold text-emerald-600">{unit?.regNo}</td>
                      <td className={`p-4 font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{log.issue}</td>
                      <td className="p-4 font-mono">${log.cost}</td>
                      <td className="p-4"><span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 border border-amber-500/30 text-amber-500">{log.status}</span></td>
                      <td className="p-4 text-center">
                        {log.status === 'Active' && <button onClick={() => handleCloseMaintenance(log.id)} className={`border hover:text-emerald-500 px-3 py-1 rounded-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>Release Unit</button>}
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
function FuelExpenses({ vehicles, fuelLogs, setFuelLogs, expenses, setExpenses, darkMode }) {
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
      <div className={`p-6 rounded-3xl border space-y-4 shadow-md ${darkMode ? 'bg-[#0a0e1a] border-slate-800' : 'bg-white border-slate-200'}`}>
        <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}><Fuel size={14} className="text-emerald-500"/> Log Fuel Receipt</h3>
        <form onSubmit={handleAddFuel} className="space-y-3 text-xs">
          <select required className={`w-full border rounded-xl p-3 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`} value={newFuel.vehicleId} onChange={e => setNewFuel({...newFuel, vehicleId: e.target.value})}>
            <option value="">-- Choose Target Unit --</option>
            {vehicles.map(v => <option key={v.id} value={v.id}>{v.regNo} ({v.model})</option>)}
          </select>
          <input type="number" required placeholder="Liters Dispensed" className={`w-full border rounded-xl p-3 focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`} value={newFuel.liters} onChange={e => setNewFuel({...newFuel, liters: e.target.value})} />
          <input type="number" required placeholder="Cost Outlay ($)" className={`w-full border rounded-xl p-3 focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`} value={newFuel.cost} onChange={e => setNewFuel({...newFuel, cost: e.target.value})} />
          <button type="submit" className="w-full bg-emerald-600 font-bold p-3 rounded-xl text-white">Log Fuel Intake</button>
        </form>
      </div>
      <div className={`p-6 rounded-3xl border space-y-4 shadow-md ${darkMode ? 'bg-[#0a0e1a] border-slate-800' : 'bg-white border-slate-200'}`}>
        <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}><DollarSign size={14} className="text-blue-500"/> Log Auxiliary Expense</h3>
        <form onSubmit={handleAddExpense} className="space-y-3 text-xs">
          <select required className={`w-full border rounded-xl p-3 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`} value={newExpense.vehicleId} onChange={e => setNewExpense({...newExpense, vehicleId: e.target.value})}>
            <option value="">-- Choose Target Unit --</option>
            {vehicles.map(v => <option key={v.id} value={v.id}>{v.regNo} ({v.model})</option>)}
          </select>
          <input type="text" required placeholder="Expense Description (e.g. Tolls)" className={`w-full border rounded-xl p-3 focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`} value={newExpense.type} onChange={e => setNewExpense({...newExpense, type: e.target.value})} />
          <input type="number" required placeholder="Cost ($)" className={`w-full border rounded-xl p-3 focus:outline-none ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`} value={newExpense.cost} onChange={e => setNewExpense({...newExpense, cost: e.target.value})} />
          <button type="submit" className="w-full bg-blue-600 font-bold p-3 rounded-xl text-white">Log Expense Charge</button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 9. MASTER SYSTEM ORCHESTRATOR FRAME WITH THEME CONTROLLER
// ==========================================
export default function App() {
  const [session, setSession] = useState(null); 
  const [activeTab, setActiveTab] = useState('drivers'); 
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [darkMode, setDarkMode] = useState(false); // Default to Dark mode as requested by project mockup theme

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
    }} darkMode={darkMode} setDarkMode={setDarkMode} />;
  }

  return (
    <div className={`flex h-screen overflow-hidden font-sans relative transition-colors duration-300 ${darkMode ? 'bg-[#050811] text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      
      <Sidebar 
        activeTab={activeTab} setActiveTab={setActiveTab} 
        userRole={session.role} userEmail={session.email}
        isOpen={sidebarOpen} setIsOpen={setSidebarOpen} 
        onLogout={() => setSession(null)} darkMode={darkMode}
      />
      
      <div className="flex-1 flex flex-col min-w-0 h-full">
        
        {/* Global Dashboard Top bar Panel containing Navigation Controls and Theme Toggle */}
        <header className={`flex items-center justify-between p-4 border-b shrink-0 ${darkMode ? 'bg-[#0a0e1a] border-slate-800/80' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className={`lg:hidden p-2 border rounded-xl ${darkMode ? 'text-slate-400 hover:text-white bg-slate-950 border-slate-800' : 'text-slate-600 hover:text-slate-900 bg-slate-50 border-slate-200'}`}>
              <Menu size={20} />
            </button>
            <span className={`text-xs font-black tracking-widest uppercase hidden lg:inline-block ${darkMode ? 'text-white' : 'text-slate-800'}`}>Operational Control Center</span>
            <span className="lg:hidden px-2.5 py-1 text-[9px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-md uppercase tracking-wider">
              {activeTab}
            </span>
          </div>
          
          {/* Theme Switcher Button */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${darkMode ? 'bg-slate-950 border-slate-800 text-amber-400 hover:text-amber-300' : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'}`}
            title={darkMode ? "Switch to Day View" : "Switch to Night View"}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </header>

        <main className={`flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 ${darkMode ? 'bg-gradient-to-b from-slate-900/10 to-[#050811]' : 'bg-slate-100/50'}`}>
          {activeTab === 'dashboard' && <Dashboard vehicles={vehicles} trips={trips} fuelLogs={fuelLogs} maintenanceLogs={maintenanceLogs} expenses={expenses} darkMode={darkMode} />}
          {activeTab === 'vehicles' && <VehicleRegistry vehicles={vehicles} setVehicles={setVehicles} darkMode={darkMode} />}
          {activeTab === 'drivers' && <DriverRoster drivers={drivers} setDrivers={setDrivers} userRole={session.role} darkMode={darkMode} />}
          {activeTab === 'trips' && <DispatchCenter vehicles={vehicles} setVehicles={setVehicles} drivers={drivers} setDrivers={setDrivers} trips={trips} setTrips={setTrips} darkMode={darkMode} />}
          {activeTab === 'maintenance' && <WorkshopSystem vehicles={vehicles} setVehicles={setVehicles} maintenanceLogs={maintenanceLogs} setMaintenanceLogs={setMaintenanceLogs} darkMode={darkMode} />}
          {activeTab === 'accounting' && <FuelExpenses vehicles={vehicles} fuelLogs={fuelLogs} setFuelLogs={setFuelLogs} expenses={expenses} setExpenses={setExpenses} darkMode={darkMode} />}
        </main>
      </div>

    </div>
  );
}
