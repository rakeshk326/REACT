const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(checkForAuthenticationCookie("token"));

mongoose.connect('mongodb+srv://kprakesh2002:sJH9NTNw9zjW4UFV@yummy-foods-db.ferbn29.mongodb.net/yummy?retryWrites=true&w=majority&appName=yummy-foods-db')
.then(console.log("MongoDB connected"));

app.use("/user", userRouter);
app.use("/order", orderRouter);

app.listen(PORT, () => console.log(`Server running at port : ${PORT}`));