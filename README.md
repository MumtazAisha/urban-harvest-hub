### LINKS

FRONTEND: https://urbanharvesthub.netlify.app/
BACKEND: https://urban-harvest-hub-64ka.onrender.com
GITHUB: https://github.com/MumtazAisha/urban-harvest-hub.git

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

### SQLite Database 

This project uses SQLite for database integration. The SQLite database file is included inside the `server/database` folder for local testing.

Databse setup:

```bash
cd server
npm install
npm run seed
npm start
```

### Testing API

ENDPOINTS:
GET	/products - Retrieve all products
GET	/products/ - Retrieve a specific product
GET	/workshops - Retrieve all workshops
GET	/workshops/ - Retrieve a specific workshop
GET	/events - Retrieve all events
GET	/events/ - Retrieve a specific event
POST /products - Create a new product
POST /workshops - Create a new workshop
POST /events - Create a new event

1. start the backend server

```bash
cd server
npm start
```

2. open these URLs in a browser or API client

https://localhost:5000/products
https://localhost:5000/events
https://localhost:5000/workshops

### Testing GUI

1. functional testing
Home Page - Loads successfully with hero section and weather widget
Products Page - Displays products and supports search/filtering
Workshops Page - Displays workshops and supports search/filtering
Events Page - Displays events and supports search/filtering
Item Details - Displays selected item information
Booking System - Allows users to add and remove bookings
Booking Summary - Calculates and displays total amount correctly
Admin Content Manager - Allows creation of products, workshops, and events
Dark Mode - Theme changes correctly
PWA Installation - Application can be installed on supported devices

2. responsive testing
The application was tested on:

Desktop screens
Mobile screens