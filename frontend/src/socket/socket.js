import { io } from "socket.io-client";
const BASE_URL = import.meta.env.VITE_API_URL;

export const createConnection = () => {
  return io(BASE_URL, { withCredentials: true });
};
