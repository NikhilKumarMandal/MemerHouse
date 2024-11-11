import express from "express";
import { globalErrorHandler } from "./middlewares/globalErrrorHandler";

const app = express();

app.use(globalErrorHandler);

export default app;
