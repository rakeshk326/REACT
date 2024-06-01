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

app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(checkForAuthenticationCookie("token"));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use("/user", userRouter);
app.use("/order", orderRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => console.log(`Server running at port : ${PORT}`));
