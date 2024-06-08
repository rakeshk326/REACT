const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
require('dotenv').config();
const mongoose = require("mongoose");
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

app.use(express.urlencoded({ extended: true }));
app.use(cors({ 
    origin: 'http://localhost:5173', 
    credentials: true 
}))
app.use(cookieParser());
app.use(express.json());
app.use(checkForAuthenticationCookie("token"));

app.use("/user", userRouter);
app.use("/order", orderRouter);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.options('*', cors());
app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Origin",
      "http://localhost:5173"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

const allowMethods = ['GET', 'POST'];
const allowHeaders = ['Content-Type', 'Authorization'];

app.options("*", (req, res) => {
    console.log("preflight");
    if (
      req.headers.origin === "https://yummy-foods.onrender.com" &&
      allowMethods.includes(req.headers["access-control-request-method"]) &&
      allowHeaders.includes(req.headers["access-control-request-headers"])
    ) {
      console.log("pass");
      return res.status(204).send();
    } else {
      console.log("fail");
    }
  });

app.listen(PORT, () => console.log(`Server running at port : ${PORT}`));