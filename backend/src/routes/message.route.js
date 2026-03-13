const express = require("express");
const messageRouter = express.Router();
const {
  getAllUser,
  sendMessage,
  receiveMessage,
} = require("../controllers/message.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/message.middleware");

messageRouter.get("/allUser", authMiddleware, getAllUser);
messageRouter.post(
  "/send/:id",
  authMiddleware,
  upload.single("image"),
  sendMessage,
);
messageRouter.get("/receive/:id", authMiddleware, receiveMessage);

module.exports = messageRouter;
