// js/api.js
const API = (() => {
  const auth = axios.create({ baseURL: CONFIG.AUTH_URL });
  const data = axios.create({ baseURL: CONFIG.DATA_URL });

  // ---- AUTH ----
  const login = async (username, password) => {
    const res = await auth.get(`/users?username=${username}`);
    const user = res.data[0];
    if (!user || user.password !== password) throw new Error('Invalid credentials');
    const roleRes = await auth.get(`/roles/${user.roleId}`);
    return { ...user, role: roleRes.data.name };
  };

  const getUsers = async () => (await auth.get('/users')).data;

  const createUser = async (userData) => {
    // Check unique username
    const existing = await auth.get(`/users?username=${userData.username}`);
    if (existing.data.length > 0) throw new Error('Username already exists');
    const newUser = { ...userData, roleId: '3', id: String(Date.now()) };
    return (await auth.post('/users', newUser)).data;
  };

  const getTechnicians = async () => {
    const res = await auth.get('/users?roleId=2');
    return res.data;
  };

  // ---- TICKETS ----
  const getTickets = async () => (await data.get('/tickets')).data;

  const getTicket = async (id) => (await data.get(`/tickets/${id}`)).data;

  const createTicket = async (ticket) => {
    const newTicket = { ...ticket, id: String(Date.now()), createdAt: new Date().toISOString() };
    return (await data.post('/tickets', newTicket)).data;
  };

  const updateTicket = async (id, ticket) => (await data.patch(`/tickets/${id}`, ticket)).data;

  const deleteTicket = async (id) => (await data.delete(`/tickets/${id}`)).data;

  return { login, getUsers, createUser, getTechnicians, getTickets, getTicket, createTicket, updateTicket, deleteTicket };
})();
