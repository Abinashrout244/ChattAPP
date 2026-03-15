import { io } from "socket.io-client";
import { BASE_URL } from "../utils/constant";

export const createConnection = () => {
  return io(BASE_URL, { withCredentials: true });
};
