import express from "express";
import userRouter from "./routes/auth.routes";
import cookieParser from "cookie-parser";
// import { createServer } from "http";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app = express();
// const server = createServer(app)

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// routes

app.use("/api/v1/users", userRouter);

// app.use("/api/v1/room", userRouter);

app.use(globalErrorHandler);

export default app;
