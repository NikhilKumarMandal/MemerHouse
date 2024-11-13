import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";
import { OtpService } from "../services/otp.services";
import { HashService } from "../services/hash.services";

const router = Router();

const otpService = new OtpService();
const hashService = new HashService();
const authController = new AuthController(otpService, hashService);

router.post("/send-otp", authController.sendOtp);

export default router;
