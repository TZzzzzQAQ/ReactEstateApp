import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from "./routes/auth.route.js"
import {errorHandlerMiddleware} from "./middleWare/errorHandler.middleware.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected!");
    }).catch(err => {
    console.log(err);
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user', userRoute);

app.use(errorHandlerMiddleware)

app.listen(3000, () => {
    console.log('Server started on port 3000!!!');
})