# ChatAPP Backend (Node.js + Express)

This folder contains the **backend API server** for ChatAPP. It is a **Node.js (Express)** application that provides user authentication, message storage, and real-time messaging via **Socket.io**.

---

## ✅ Quick Start

### 1) Install dependencies

```bash
npm install
```

### 2) Run in development

```bash
npm run dev
```

### 3) Run in production

```bash
npm start
```

---

## 🗂️ Backend Folder Structure

```
backend/
├── src/
│   ├── app.js                # Express app + Socket.io initialization
│   ├── config/               # Config for DB + third-party services
│   │   ├── cloudinary.js
│   │   └── database.js
│   ├── controllers/          # Route handlers
│   │   ├── auth.controller.js
│   │   └── message.controller.js
│   ├── middlewares/          # Express middlewares
│   │   ├── auth.middleware.js
│   │   ├── message.middleware.js
│   │   └── socket.middleware.js
│   ├── model/                # Mongoose models
│   │   ├── auth.model.js
│   │   └── message.model.js
│   ├── routes/               # API routes
│   │   ├── auth.route.js
│   │   └── message.route.js
│   └── utils/                # Shared helpers
│       ├── socketio.js
│       └── validateData.js
├── .env                      # Environment variables
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔌 Environment Variables

Create a `.env` file in the `backend/` folder (not committed) and define the following values:

- `PORT` - port to run the server (e.g. `5000`)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - secret used to sign JWT tokens
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` - optional (for profile image uploads)

---

## 🔑 Key API Endpoints

### Authentication

- `POST /api/auth/login` — login with `{ emailId, password }`
- `POST /api/auth/logout` — clear session cookie
- `GET /api/auth/user` — get current logged-in user
- `PUT /api/auth/profile-edit` — update user profile

### Messaging

- `GET /api/msg/allUser` — list all users (chat list)
- `GET /api/msg/receive/:userId` — get conversation with a user
- `POST /api/msg/send/:userId` — send a message to a user

---

## 🔥 Realtime (Socket.io)

The server initializes a Socket.io instance and uses it to broadcast new messages, online status updates, and read receipts.

---

## 🛠️ Notes

- The backend uses **cookies** for authentication, so the frontend must send requests with `withCredentials: true`.
- Ensure CORS is configured to allow the frontend origin and credentials.
