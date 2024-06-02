const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
require('dotenv').config();
const mongoose = require("mongoose");
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(cookieParser());
app.use(express.json());
app.use(checkForAuthenticationCookie("token"));

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use("/user", userRouter);
app.use("/order", orderRouter);

app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Origin",
      "React app URL"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

app.listen(PORT, () => console.log(`Server running at port : ${PORT}`));
