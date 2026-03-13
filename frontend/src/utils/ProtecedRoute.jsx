import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import FullPageSpinner from "./FullPageSpinner";

const ProtecedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.user);

  if (loading)
    return <FullPageSpinner label="Loading your account..." />;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtecedRoute;
