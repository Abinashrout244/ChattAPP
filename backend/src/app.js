const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const userRoute = require("./routes/auth.route");
const messageRoute = require("./routes/message.route");
const cors = require("cors");
app.use(express.json()); //This is a built in middleware which is convert json -> js Object ,Provided by express
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", userRoute);
app.use("/api/msg", messageRoute);

connectDB()
  .then(() => {
    console.log("Database connection establish perfectly!");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server Connection establish Perfectly" + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);

    console.log("Mongo Db connection Not Establich");
  });
