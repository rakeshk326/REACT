import express, { urlencoded, json } from 'express';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 8000;
require('dotenv').config();
import { connect } from "mongoose";
import userRouter from './routes/user';
import orderRouter from './routes/order';
import cookieParser from 'cookie-parser';
import { validateToken } from '../services/authentication';
import { checkForAuthenticationCookie } from "./middlewares/authentication";

app.use(urlencoded({ extended: true }));
app.use(cors({ 
    origin: 'http://localhost:5173', 
    credentials: true 
}))
app.use(cookieParser());
app.use(json());
app.use(checkForAuthenticationCookie("token"));

app.use("/user", userRouter);
app.use("/order", orderRouter);

connect(process.env.MONGO_URL)
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
