import { Router } from "express";
import { RoomController } from "../controllers/rooms.controllers";
import { RoomService } from "../services/room.services";
import logger from "../utils/logger";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

const roomService = new RoomService();
const roomController = new RoomController(roomService, logger);

router.post("/create-room", verifyJWT, roomController.create);

export default router;
