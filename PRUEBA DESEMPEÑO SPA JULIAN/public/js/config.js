// js/config.js
const CONFIG = {
  AUTH_URL: 'http://localhost:3001',
  DATA_URL: 'http://localhost:3002',
  SESSION_KEY: 'sd_session',
  INACTIVITY_MS: 5 * 60 * 1000, // 5 minutes
};

const ROLES = { ADMIN: 'admin', TECNICO: 'tecnico', CLIENTE: 'cliente' };

const STATUSES = ['En proceso', 'Asignado', 'Solucionado'];
const TYPES = ['incidente', 'requerimiento', 'soporte'];
