require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const flightRouter = require("./routes/flightRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const userRouter = require("./routes/userRoutes");

const User = require("./model/user.js");

const dbPath = process.env.URI;

mongoose
  .connect(dbPath)
  .then((result) => console.log("connected to DB"))
  .catch((err) => console.log(err));

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use("/payment/", paymentRoutes);
app.use("/flights", flightRouter);
app.use("/user", userRouter);

app.listen(8000);
console.log("Back-end Listening on port 8000");

