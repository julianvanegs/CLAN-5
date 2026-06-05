# SupportDesk — Technical Support Ticket Manager

## Description
A single-page application (SPA) for managing technical support reservations. Built with vanilla JavaScript, it features role-based access control (Admin, ,Client), session persistence with auto-logout, and two independent json-server backends.

## Technologies Used
- **Frontend**: Vanilla JavaScript (ES5+), HTML5, CSS3
- **HTTP Client**: Axios (CDN)
- **Backend (mock)**: json-server ×2

## Installation
```bash
npm install
```

## How to Run Both json-server Services
Open two terminals:

```bash
# Terminal 1 – Authentication service (port 3001)
npm run auth
# or: json-server --watch auth-db.json --port 3001

# Terminal 2 – Data service (port 3002)
npm run data
# or: json-server --watch data-db.json --port 3002
```

Then open `public/index.html` in a browser (or use a local server like `live-server`).

## Default Credentials
| Role     | Username | Password  |
|----------|----------|-----------|
| Admin    | admin    | admin123  |
| Client   | client1  | client123 |

## Project Structure
```
support-reservations/
├── auth-db.json          # Auth json-server database (users, roles)
├── data-db.json          # Data json-server database (reservations)
├── package.json
├── README.md
└── public/
    ├── index.html        # SPA entry point
    ├── style.css         # All styles
    └── js/
        ├── config.js     # Constants (URLs, role names, timeouts)
        ├── session.js    # localStorage session + inactivity timer
        ├── api.js        # All API calls (Axios)
        ├── middleware.js # Route protection logic
        ├── views.js      # All view renderers
        ├── router.js     # Hash-based SPA router
        └── app.js        # Bootstrap / entry
```

## Role Behavior

### Admin
- Full CRUD on all reservations
- Can assign any technician to any ticket
- Can set ticket status (only when technician is assigned)
- Access to Users page

### Technician
- Create reservations (auto-assigned as responsible)
- View and edit only their own reservations
- Can set reservation status


### Client
- Register via the Register page (auto-assigned `cliente` role)
- Create reservations (no technician selection)
- View and edit only their own reservations **as long as no technician is assigned**
- Cannot set ticket status

## Key Technical Decisions

| Decision | Reason |
|---|---|
| Vanilla JS modules via IIFE | No build tool required; simple and portable |
| Hash-based routing (`#/path`) | Works with `file://` protocol; no server config needed |
| Middleware pattern | Centralized route guard, easy to extend |
| Two json-server instances | Simulates microservice separation (auth vs data) |
| localStorage for session | Simple persistence; cleared on logout or inactivity |
| 5-min inactivity logout | Security best practice; 30s warning banner shown first |

## Members
- Julian Vanegas
