import jwt from 'jsonwebtoken';

// Menu/role matrix mirrored exactly from the frontend Sidebar component
export const ROUTE_ROLES = {
  dashboard: ['Fleet Manager', 'Financial Analyst'],
  vehicles: ['Fleet Manager'],
  drivers: ['Fleet Manager', 'Safety Officer', 'Driver'],
  trips: ['Fleet Manager', 'Driver'],
  maintenance: ['Fleet Manager'],
  accounting: ['Fleet Manager', 'Financial Analyst'],
};

export function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

// requireRole('vehicles') -> only roles in ROUTE_ROLES.vehicles pass
// requireRole(['Fleet Manager']) -> pass an explicit array for finer-grained checks
export function requireRole(moduleOrRoles) {
  const allowed = Array.isArray(moduleOrRoles) ? moduleOrRoles : ROUTE_ROLES[moduleOrRoles];
  return (req, res, next) => {
    if (!req.user || !allowed.includes(req.user.role)) {
      return res.status(403).json({ error: `Access denied. Role '${req.user?.role}' is not authorized for this resource.` });
    }
    next();
  };
}
