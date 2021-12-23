const express = require("express");
const app = express();
require("dotenv").config();
const flightRouter = require("./routes/flightRoutes");
const userRouter = require("./routes/userRoutes");
const User = require("./model/user.js");

const mongoose = require("mongoose");
const cors = require("cors");
const dbPath = process.env.URI;

mongoose
  .connect(dbPath)
  .then((result) => console.log("connected to DB"))
  .catch((err) => console.log(err));

app.use(cors());
app.use("/flights", flightRouter);
app.use("/user", userRouter);

app.listen(8000);
console.log("Back-end Listening on port 8000");
