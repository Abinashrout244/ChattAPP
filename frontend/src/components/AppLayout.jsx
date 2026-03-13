import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

import LoginPage from "./LoginPage";
import Body from "./Body";
import Profile from "./Profile";
import Home from "./Home";

import Settings from "./Settings";

import { Toaster } from "react-hot-toast";
import ProtecedRoute from "../utils/ProtecedRoute";
import FullPageSpinner from "../utils/FullPageSpinner";
import { BASE_URL } from "../utils/Constant";
import { addUser, removeUser, setLoading } from "../utils/userSlice";

const AppLayout = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    let mounted = true;

    const bootstrapAuth = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(BASE_URL + "/api/auth/user", {
          withCredentials: true,
        });

        if (!mounted) return;
        const nextUser = res?.data?.user ?? res?.data?.findUser ?? null;
        dispatch(addUser(nextUser));
      } catch (err) {
        if (!mounted) return;
        dispatch(removeUser());
      }
    };

    bootstrapAuth();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  if (loading) {
    return <FullPageSpinner label="Loading your account..." />;
  }

  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Body />}>
          <Route
            index
            element={
              <ProtecedRoute>
                <Home />
              </ProtecedRoute>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="profile"
            element={
              <ProtecedRoute>
                <Profile />
              </ProtecedRoute>
            }
          />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppLayout;
