import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import dotenv from "dotenv";

import "./passport";


const app = express();

const MongoStore = require("connect-mongo").default;

app.use(helmet());
app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org");
    return next();
    });
app.set("view engine","pug")
app.use("/uploads",express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URL },{ useUnifiedTopology: true })
    })
    );
app.use(passport.initialize());
app.use(passport.session());
    
app.use(localsMiddleware);

app.use(routes.home,globalRouter);
app.use(routes.users,userRouter);
app.use(routes.videos,videoRouter); //user 는 라우터 사용하겠다는 거다
app.use(routes.api, apiRouter);


export default app;