// js/views.js
const Views = (() => {

  // ---- HELPERS ----
  const statusBadge = (s) => {
    const map = { 'Approved': 'badge-process', 'Reject': 'badge-assigned', 'Canceled': 'badge-solved' };
    return `<span class="badge ${map[s] || 'badge-open'}">${s || 'Pending'}</span>`;
  };

  const showAlert = (container, msg, type = 'error') => {
    const el = container.querySelector('.alert');
    if (el) el.remove();
    const a = document.createElement('div');
    a.className = `alert alert-${type}`;
    a.textContent = msg;
    container.prepend(a);
    if (type === 'success') setTimeout(() => a.remove(), 3000);
  };

  const openModal = (html) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = html;
    document.body.appendChild(overlay);
    overlay.querySelector('.modal-close')?.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    return overlay;
  };

  // ---- NAV ----
  const renderNav = () => {
    const user = Session.getUser();
    if (!user) { document.querySelector('nav')?.remove(); return; }
    const role = user.role;
    let links = `<a data-route="/tickets">Tickets</a>`;
    if (role === ROLES.ADMIN) links += `<a data-route="/users">Users</a>`;
    const nav = document.createElement('nav');
    nav.innerHTML = `
      <span class="nav-brand">⚡ SupportDesk</span>
      <div class="nav-links">${links}</div>
      <div style="display:flex;align-items:center;gap:.75rem">
        <span class="nav-user">${user.name} <small>(${role})</small></span>
        <button class="btn-logout" id="btn-logout">Logout</button>
      </div>`;
    const existing = document.querySelector('nav');
    if (existing) existing.replaceWith(nav);
    else document.getElementById('app').prepend(nav);
    document.getElementById('btn-logout').onclick = () => { Session.clear(); Router.navigate('/login'); };
    // Active link
    nav.querySelectorAll('[data-route]').forEach(a => {
      if (a.dataset.route === location.hash.replace('#', '') || a.dataset.route === '/tickets' && !location.hash) a.classList.add('active');
      a.onclick = () => Router.navigate(a.dataset.route);
    });
  };

  // ---- LOGIN ----
  const renderLogin = (container) => {
    container.innerHTML = `
      <div class="login-wrap">
        <div class="login-box card">
          <h1 class="login-title">SupportDesk</h1>
          <p class="login-sub">Sign in to your account</p>
          <div id="login-alert"></div>
          <div class="form-group"><label>Username</label><input id="l-user" type="text" placeholder="admin" /></div>
          <div class="form-group"><label>Password</label><input id="l-pass" type="password" placeholder="••••••" /></div>
          <button class="btn btn-primary" style="width:100%" id="btn-login">Sign In</button>
          <p style="text-align:center;margin-top:1rem;font-size:.875rem;color:var(--muted)">No account? <a href="#" id="go-register" style="color:var(--accent)">Register</a></p>
        </div>
      </div>`;
    const alertBox = container.querySelector('#login-alert');
    const doLogin = async () => {
      const u = container.querySelector('#l-user').value.trim();
      const p = container.querySelector('#l-pass').value.trim();
      if (!u || !p) return showAlert(alertBox, 'Please fill all fields');
      try {
        const user = await API.login(u, p);
        Session.set(user);
        Router.navigate('/tickets');
      } catch (e) { showAlert(alertBox, e.message); }
    };
    container.querySelector('#btn-login').onclick = doLogin;
    container.querySelector('#l-pass').onkeydown = (e) => { if (e.key === 'Enter') doLogin(); };
    container.querySelector('#go-register').onclick = (e) => { e.preventDefault(); Router.navigate('/register'); };
  };

  // ---- REGISTER ----
  const renderRegister = (container) => {
    container.innerHTML = `
      <div class="login-wrap">
        <div class="login-box card">
          <h1 class="login-title">Register</h1>
          <p class="login-sub">Create a client account</p>
          <div id="reg-alert"></div>
          <div class="form-group"><label>Full Name</label><input id="r-name" type="text" /></div>
          <div class="form-group"><label>Email</label><input id="r-email" type="email" /></div>
          <div class="form-group"><label>Username</label><input id="r-user" type="text" /></div>
          <div class="form-group"><label>Password</label><input id="r-pass" type="password" /></div>
          <button class="btn btn-primary" style="width:100%" id="btn-reg">Create Account</button>
          <p style="text-align:center;margin-top:1rem;font-size:.875rem;color:var(--muted)"><a href="#" id="go-login" style="color:var(--accent)">Back to Login</a></p>
        </div>
      </div>`;
    const alertBox = container.querySelector('#reg-alert');
    container.querySelector('#btn-reg').onclick = async () => {
      const name = container.querySelector('#r-name').value.trim();
      const email = container.querySelector('#r-email').value.trim();
      const username = container.querySelector('#r-user').value.trim();
      const password = container.querySelector('#r-pass').value.trim();
      if (!name || !email || !username || !password) return showAlert(alertBox, 'All fields required');
      try {
        await API.createUser({ name, email, username, password });
        showAlert(alertBox, 'Account created! Please login.', 'success');
        setTimeout(() => Router.navigate('/login'), 1500);
      } catch (e) { showAlert(alertBox, e.message); }
    };
    container.querySelector('#go-login').onclick = (e) => { e.preventDefault(); Router.navigate('/login'); };
  };

  // ---- TICKETS ----
  const renderTickets = async (container) => {
    const user = Session.getUser();
    const role = user.role;
    container.innerHTML = `<div class="page"><div class="page-title">Tickets <button class="btn btn-primary btn-sm" id="btn-new" style="margin-left:.75rem">+ New</button></div><div id="t-alert"></div><div id="stats"></div><div class="card table-wrap"><table><thead><tr><th>Name</th><th>Place</th><th>Date</th> <th>Time</th><th>Status</th><th>Actions</th></tr></thead><tbody id="t-body"></tbody></table></div></div>`;
    const alertBox = container.querySelector('#t-alert');

    const load = async () => {
      try {
        let tickets = await API.getTickets();
        // Filter by role
        if (role === ROLES.TECNICO) tickets = tickets.filter(t => t.technicianId === user.id);
        if (role === ROLES.CLIENTE) tickets = tickets.filter(t => t.clientId === user.id);

        // Stats for admin
        if (role === ROLES.ADMIN) {
          const stats = container.querySelector('#stats');
          const counts = { total: tickets.length, open: tickets.filter(t => !t.status).length, process: tickets.filter(t => t.status === 'Approved').length, solved: tickets.filter(t => t.status === 'Canceled').length };
          stats.innerHTML = `<div class="stats"><div class="stat"><div class="stat-val">${counts.total}</div><div class="stat-lbl">Total</div></div><div class="stat"><div class="stat-val">${counts.process}</div><div class="stat-lbl">In Process</div></div><div class="stat"><div class="stat-val">${counts.solved}</div><div class="stat-lbl">Solved</div></div></div>`;
        }

        const tbody = container.querySelector('#t-body');
        if (!tickets.length) { tbody.innerHTML = `<tr><td colspan="6" class="empty">No tickets found</td></tr>`; return; }
        tbody.innerHTML = tickets.map(t => {
          const canEdit = role === ROLES.ADMIN ||
            (role === ROLES.TECNICO && t.technicianId === user.id) ||
            (role === ROLES.CLIENTE && t.clientId === user.id && !t.technicianId);
          const canDel = role === ROLES.ADMIN;  
          
          return `<tr>
            <td><strong>${t.name}</strong></td>
             <td>${t.place || '<span style="color:var(--muted)">—</span>'}</td>
            <td>${t.date || '<span style="color:var(--muted)">—</span>'}</td>
             <td>${t.time || '<span style="color:var(--muted)">—</span>'}</td>
            <td>${statusBadge(t.status)}</td>
            
        
            <td style="white-space:nowrap">
              ${canEdit ? `<button class="btn btn-ghost btn-sm btn-edit" data-id="${t.id}">Edit</button>` : ''}
              ${canDel ? `<button class="btn btn-danger btn-sm btn-del" data-id="${t.id}">Del</button>` : ''}
            </td></tr>`;
        }).join('');
        tbody.querySelectorAll('.btn-edit').forEach(b => b.onclick = () => openTicketModal(b.dataset.id, tickets, alertBox, load));
        tbody.querySelectorAll('.btn-del').forEach(b => b.onclick = () => deleteTicket(b.dataset.id, alertBox, load));
      } catch (e) { showAlert(alertBox, 'Failed to load tickets: ' + e.message); }
    };

    container.querySelector('#btn-new').onclick = () => openTicketModal(null, [], alertBox, load);
    await load();
  };

  const openTicketModal = async (id, tickets, alertBox, reload) => {
    const user = Session.getUser();
    const role = user.role;
    let ticket = id ? tickets.find(t => t.id === id) || await API.getTicket(id) : null;

    // Permissions: cliente can't edit if technician assigned
    if (role === ROLES.CLIENTE && ticket && ticket.technicianId) {
      alert('You cannot edit a ticket with an assigned technician.');
      return;
    }

    let techs = [];
    if (role === ROLES.ADMIN) techs = await API.getTechnicians();

    const isNew = !ticket;
    const title = isNew ? 'New Ticket' : 'Edit Ticket';

    // Status options: only available if technician assigned (or for technician editing own)
    const hasTech = ticket?.technicianId || role === ROLES.TECNICO;
    const statusOpts = STATUSES.map(s => `<option value="${s}" ${ticket?.status === s ? 'selected' : ''}>${s}</option>`).join('');

    const techSelect = role === ROLES.ADMIN ? `
      <div class=" form-group"><label></label>
        <select id="m-tech">
          <option value="">— Unassigned —</option>
          ${techs.map(t => `<option value="${t.id}" ${ticket?.technicianId === t.id ? 'selected' : ''}>${t.name}</option>`).join('')}
        </select></div>` : '';

    const statusField = (role !== ROLES.CLIENTE) ? `
      <div class="form-group"><label>Status</label>
        <select id="m-status" ${!hasTech ? 'disabled title="Assign a technician first"' : ''}>
          <option value="">— Open —</option>${statusOpts}
        </select></div>` : '';

    const overlay = openModal(`
      <div class="modal">
        <div class="modal-header"><span class="modal-title">${title}</span><button class="modal-close">✕</button></div>
        <div class="modal-body">
          <div id="m-alert"></div>
          <div class="form-group"><label>Name *</label><input id="m-name" value="${ticket?.name || ''}" /></div>
          <div class="form-group"><label>Place *</label><input id="m-place" value="${ticket?.place || ''}" /></div>
           <div class="form-group"><label>Date *</label><input id="m-date" value="${ticket?.date || ''}" /></div>
            <div class="form-group"><label>Start and End Time *</label><input id="m-time" value="${ticket?.time || ''}" /></div>
          <div class="form-group"><label>Reason of the Reservati  on</label><textarea id="m-desc">${ticket?.description || ''}</textarea></div>
          
          ${techSelect}${statusField}
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost modal-close">Cancel</button>
          <button class="btn btn-primary" id="m-save">Save</button>
        </div>
      </div>`);

    // When admin changes tech, enable status
    if (role === ROLES.ADMIN) {
      const techEl = overlay.querySelector('#m-tech');
      const statusEl = overlay.querySelector('#m-status');
      if (techEl && statusEl) {
        techEl.onchange = () => { statusEl.disabled = !techEl.value; };
      }
    }

    overlay.querySelector('#m-save').onclick = async () => {
      const mAlert = overlay.querySelector('#m-alert');
      const name = overlay.querySelector('#m-name').value.trim();
      const place = overlay.querySelector('#m-place').value.trim();
      const date = overlay.querySelector('#m-date').value.trim();
      const time = overlay.querySelector('#m-time').value.trim();
      const description = overlay.querySelector('#m-desc').value.trim();
      if (!name) return showAlert(mAlert, 'Ticket name is required');

      let payload = { name, place, date, time, description };

      if (role === ROLES.ADMIN) {
        const techId = overlay.querySelector('#m-tech').value;
        const tech = techs.find(t => t.id === techId);
        payload.technicianId = techId || '';
        payload.technicianName = tech?.name || '';
        const statusVal = overlay.querySelector('#m-status').value;
        if (techId) payload.status = statusVal || 'Asignado';
        else { payload.status = ''; payload.technicianId = ''; }
      } else if (role === ROLES.TECNICO) {
        payload.status = overlay.querySelector('#m-status')?.value || ticket?.status || '';
        if (isNew) { payload.technicianId = user.id; payload.technicianName = user.name; }
      }

      if (isNew) {
        payload.clientId = user.id;
        payload.clientName = user.name;
        if (role === ROLES.ADMIN && !payload.technicianId) { payload.technicianId = ''; payload.technicianName = ''; }
      }

      try {
        if (isNew) await API.createTicket(payload);
        else await API.updateTicket(id, payload);
        overlay.remove();
        await reload();
        showAlert(alertBox, isNew ? 'Ticket created!' : 'Ticket updated!', 'success');
      } catch (e) { showAlert(mAlert, 'Error: ' + e.message); }
    };
  };

  const deleteTicket = async (id, alertBox, reload) => {
    if (!confirm('Delete this ticket?')) return;
    try { await API.deleteTicket(id); await reload(); showAlert(alertBox, 'Ticket deleted.', 'success'); }
    catch (e) { showAlert(alertBox, 'Error: ' + e.message); }
  };

  // ---- USERS (Admin only) ----
  const renderUsers = async (container) => {
    container.innerHTML = `<div class="page"><div class="page-title">Users</div><div id="u-alert"></div><div class="card table-wrap"><table><thead><tr><th>Name</th><th>Username</th><th>Email</th><th>Role</th></tr></thead><tbody id="u-body"><tr><td colspan="4" class="empty">Loading…</td></tr></tbody></table></div></div>`;
    try {
      const users = await API.getUsers();
      const roleMap = { '1': 'admin', '2': 'tecnico', '3': 'cliente' };
      container.querySelector('#u-body').innerHTML = users.map(u => `
        <tr><td>${u.name}</td><td>${u.username}</td><td>${u.email}</td>
        <td><span class="badge ${u.roleId === '1' ? 'badge-assigned' : u.roleId === '2' ? 'badge-process' : 'badge-open'}">${roleMap[u.roleId] || '?'}</span></td></tr>`).join('');
    } catch (e) { showAlert(container.querySelector('#u-alert'), 'Failed to load users'); }
  };

  // ---- DENIED ----
  const renderDenied = (container) => {
    container.innerHTML = `<div class="denied"><h2>🚫 Access Denied</h2><p>You don't have permission to access this page.</p><br><button class="btn btn-ghost" onclick="Router.navigate('/tickets')">Go to Tickets</button></div>`;
  };

  return { renderNav, renderLogin, renderRegister, renderTickets, renderUsers, renderDenied };
})();
