import app from "./app";
import { connectDB } from "./config/db";
import logger from "./utils/logger";

const PORT = process.env.PORT || 8000;
connectDB()
  .then(() => {
    app.on("error", (error) => {
      logger.error("ERRR: ", error);
      throw error instanceof Error ? error : new Error(String(error));
    });

    app.listen(PORT, () => {
      logger.info(`⚙️  Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("MONGO db connection failed !!! ", err);
  });
