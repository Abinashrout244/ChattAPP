import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <>
      <NavBar />
      <div className="pt-[62px] min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default Body;
