import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <NavBar />
      <div className="pt-[62px] min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
