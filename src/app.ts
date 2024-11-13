import express from "express";
import { globalErrorHandler } from "./middlewares/globalErrrorHandler";
import userRouter from "./routes/auth.routes";
const app = express();
app.use(express.json());

// routes

app.use("/api/v1", userRouter);

app.use(globalErrorHandler);

export default app;
