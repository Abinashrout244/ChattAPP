import React from "react";
import { io } from "socket.io-client";
import { BASE_URL } from "./Constant";

export const createConnection = () => {
  return io(BASE_URL, { withCredentials: true });
};
