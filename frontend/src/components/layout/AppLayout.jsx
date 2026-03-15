import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

import Body from "./Body";

import Home from "../../pages/Home";
import LoginPage from "../../pages/LoginPage";
import Profile from "../../pages/Profile";
import Settings from "../../pages/Settings";

import { Toaster } from "react-hot-toast";
import ProtectedRoute from "../../routes/ProtectedRoute";
import FullPageSpinner from "../ui/FullPageSpinner";
import { BASE_URL } from "../../utils/constant";
import { addUser, removeUser, setLoading } from "../../redux/userSlice";

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
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppLayout;
