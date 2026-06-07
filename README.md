### FEATURES

--User Features
Browse eco-friendly products
Explore workshops and community events
Category filtering
Search functionality
Item detail pages
Booking and registration system
Responsive design
Dark mode support
Weather widget

-- Admin Features
Add products, events, workshops 
Form validation
Basic admin protection

--PWA Features
Installable application
Offline support
Service worker caching
Web App Manifest
Push notifications

### TECHNOLOGIES USED

--Frontend
React
React Router
Vite
Tailwind CSS

--Backend
Node.js
Express.js
SQLite

--Additional
Service Workers
Web App Manifest
Push Notifications
Local Storage

###  BACKEND SETUP 

```bash
cd server
npm install
npm run seed
npm run dev
```

Backend runs on:
http://localhost:5000 

### FRONTEND SETUP

```bash
cd client
npm install
npm run dev 
```

Frontend runs on:
http://localhost:5173

###  ACCESSIBILITY
Semantic HTML
ARIA labels
Responsive layouts

### SQLite Database Note

This project uses SQLite for database integration. The SQLite database file is included inside the `server/database` folder for local testing.

When running the project for the first time, use:

```bash
cd server
npm run seed
