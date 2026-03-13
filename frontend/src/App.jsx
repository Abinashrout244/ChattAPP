import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";

import Body from "./components/Body";
import Profile from "./components/Profile";
import Home from "./components/Home";
import { useState } from "react";
import Settings from "./components/Settings";

function App() {
  const [user, setuser] = useState(true);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="login" element={<LoginPage />} />
            <Route
              path="profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
