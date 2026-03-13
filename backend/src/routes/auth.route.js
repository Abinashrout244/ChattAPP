const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const userRoute = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  profileEdit,

  changePassword,
} = require("../controllers/auth.controller");

userRoute.post("/signup", registerUser);
userRoute.post("/login", loginUser);
userRoute.post("/logout", authMiddleware, logoutUser);
userRoute.get("/user", authMiddleware, getUser);
userRoute.put("/profile-edit", authMiddleware, profileEdit);
userRoute.put("/changepassword", authMiddleware, changePassword);

module.exports = userRoute;
