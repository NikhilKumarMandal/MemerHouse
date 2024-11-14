import express from "express";
import { globalErrorHandler } from "./middlewares/globalErrrorHandler";
import userRouter from "./routes/auth.routes";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// routes

app.use("/api/v1/users", userRouter);
app.use("/api/v1/room", userRouter);

app.use(globalErrorHandler);

export default app;
