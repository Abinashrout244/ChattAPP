# ChatAPP Frontend (React + Vite)

This folder contains the **frontend client** for ChatAPP. It is a **React (v19) + Vite** project that connects to the backend API and provides a real-time chat experience using **Socket.io**.

---

## ✅ Quick Start

### 1) Install dependencies

```bash
npm install
```

### 2) Run the dev server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

---

## 🗂️ Frontend Folder Structure

Here is the current source layout inside `frontend/` (as of this workspace snapshot):

```
frontend/
├── public/                  # Static assets served as-is
├── src/                     # Application source
│   ├── App.jsx              # App shell + routing entrypoint
│   ├── main.jsx             # React DOM renderer + providers
│   ├── assets/              # Static assets (images)
│   │   └── images/
│   ├── components/          # Reusable UI components
│   │   ├── chat/
│   │   │   ├── ChatArea.jsx
│   │   │   ├── ChatWallpaper.jsx
│   │   │   └── MessageInput.jsx
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx
│   │   │   ├── Body.jsx
│   │   │   ├── NavBar.jsx
│   │   │   └── SideBar.jsx
│   │   └── ui/
│   │       ├── DotGrid.jsx
│   │       └── FullPageSpinner.jsx
│   ├── pages/               # Route pages
│   │   ├── Home.jsx
│   │   ├── LoginPage.jsx
│   │   ├── Profile.jsx
│   │   └── Settings.jsx
│   ├── redux/               # Redux store + slices
│   │   ├── chatSlice.js
│   │   ├── store.js
│   │   └── userSlice.js
│   ├── routes/              # Route helpers
│   │   └── ProtectedRoute.jsx
│   ├── socket/              # Socket.io client setup
│   │   └── socket.js
│   ├── styles/              # Global styles
│   │   └── App.css
│   └── utils/               # Shared utilities / constants
│       └── constant.js
├── .env                     # Optional environment variables (empty by default)
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## 📝 Recent Frontend Changes (what’s in this version)

- Added **Profile** and **Settings** pages with editable profile workflows.
- Added **socket** integration for real-time chat updates (online status, new messages).
- Implemented **Redux slices** for user and chat state management.
- Added **protected routing** (`ProtectedRoute.jsx`) for authenticated-only pages.
- Updated UI structure with reusable components under `components/` (chat layout, navigation, spinner).

---

## 🔧 Key Libraries and Technologies

- **React** (v19) — UI library
- **Vite** — Fast development server + build tooling
- **Redux Toolkit** — State management
- **React Router v7** — Routing and protected routes
- **Socket.io Client** — Real-time communication
- **Axios** — HTTP client for API calls
- **Tailwind CSS / DaisyUI** — Styling
- **Framer Motion / GSAP** — Animations
- **Three.js / @react-three/fiber** — 3D visuals (used in background effects)

---

## 🔌 Backend Integration (Endpoints + Workflow)

The frontend communicates with the backend using REST APIs and Socket.io. The base backend URL is defined in:

- `src/utils/Constant.js`
  - `BASE_URL` defaults to: `http://localhost:5000`

> If your backend runs at a different host/port, update `BASE_URL` (or replace with an env-based config).

### Primary API endpoints used by the frontend

| Purpose                    | HTTP Call                      | Notes                                                                |
| -------------------------- | ------------------------------ | -------------------------------------------------------------------- |
| Get current logged-in user | `GET /api/auth/user`           | Called on app load to validate session                               |
| Login                      | `POST /api/auth/login`         | Sends `{ emailId, password }` with cookies (`withCredentials: true`) |
| Logout                     | `POST /api/auth/logout`        | Clears server-side session/cookie                                    |
| Update profile             | `PUT /api/auth/profile-edit`   | Updates current user profile                                         |
| Get users list             | `GET /api/msg/allUser`         | Fetches all chat users                                               |
| Fetch messages with a user | `GET /api/msg/receive/:userId` | Loads conversation with selected user                                |
| Send message               | `POST /api/msg/send/:userId`   | Sends a new chat message                                             |

### Socket.io (real-time)

- Socket connection is created in: `src/utils/Socket.jsx`
- Socket connects to the same `BASE_URL` as the REST API and uses cookies (`withCredentials: true`).
- Chat updates, online/offline status, and new message notifications are handled over sockets.

---

## 🧭 Key Frontend Workflows

### Authentication flow

1. User signs in on `/login` using `LoginPage.jsx`.
2. Frontend calls `POST /api/auth/login` and stores the returned user in Redux via `userSlice`.
3. `AppLayout.jsx` fetches the current user using `GET /api/auth/user` on initial load.
4. Protected pages use `ProtecedRoute.jsx` to redirect unauthenticated users to login.

### Chat flow

1. Home page (`Home.jsx`) loads the user list from `/api/msg/allUser`.
2. Selecting a user loads messages from `/api/msg/receive/:userId`.
3. Sending a message hits `/api/msg/send/:userId` and emits a socket event to notify the recipient.

---

## 🛠️ Tips & Notes

- Authentication uses cookies, so the backend must set the cookie correctly and allow CORS with credentials.
- If the backend API URL changes (e.g., deployment), update `BASE_URL` or introduce a `.env` variable for `VITE_API_BASE_URL` and use it in `src/utils/Constant.js`.
- ESLint is configured via `eslint.config.js`; run `npm run lint` to check for issues.

---

## 📌 Helpful Commands

- `npm run dev` — Start local dev server
- `npm run build` — Create a production build
  s
