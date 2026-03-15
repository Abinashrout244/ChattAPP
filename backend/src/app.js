const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const http = require("http");
const userRoute = require("./routes/auth.route");
const messageRoute = require("./routes/message.route");
const initialiseSocket = require("./utils/socketio");
const cors = require("cors");
app.use(express.json({ limit: "5mb" })); // allow base64 image payloads
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", userRoute);
app.use("/api/msg", messageRoute);

const server = http.createServer(app);
initialiseSocket(server);

connectDB()
  .then(() => {
    console.log("Database connection establish perfectly!");
    server.listen(process.env.PORT || 5000, () => {
      console.log("Server Connection establish Perfectly" + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);

    console.log("Mongo Db connection Not Establich");
  });
