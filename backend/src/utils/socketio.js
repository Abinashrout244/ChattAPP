const { Server } = require("socket.io");
const socketAuth = require("../middlewares/socket.middleware");
const { User } = require("../model/auth.model");
const crypto = require("crypto");

const onlineUsers = new Map();
const hashRoomId = (userId, receiverId) => {
  return crypto
    .createHash("sha256")
    .update([String(userId), String(receiverId)].sort().join("$"))
    .digest("hex");
};

const initialiseSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    const userId = socket.user._id.toString();

    console.log("User Connected:", socket.user.firstName);

    // mark user online
    onlineUsers.set(userId, socket.id);

    // send current online users to new user
    socket.emit("onlineUsers", Array.from(onlineUsers.keys()));

    // notify everyone user is online
    io.emit("userOnline", userId);

    socket.on("joinChat", ({ receiverId }) => {
      try {
        if (!receiverId) {
          return socket.emit("socketError", {
            message: "receivered required for rommcreation!!",
          });
        }

        const userId = socket.user._id;
        const roomId = hashRoomId(userId, receiverId);

        console.log(socket.user.firstName + " Joined in Room: " + roomId);
        socket.join(roomId);
      } catch (err) {
        console.log(err);
      }
    });
    socket.on("sendMessage", ({ receiverId, message }) => {
      try {
        const senderId = socket.user._id;

        if (!receiverId) {
          return socket.emit("socketError", {
            message: "receiverId required",
          });
        }

        const roomId = hashRoomId(senderId, receiverId);

        console.log("Message in room:", roomId);

        io.to(roomId).emit("receiveMessage", message);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("disconnect", () => {
      console.log((socket?.user?.firstName || "User") + " is disconnected");
      onlineUsers.delete(userId);

      io.emit("userOffline", userId);
    });
  });

  return io;
};

module.exports = initialiseSocket;
