import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";
import { OtpService } from "../services/otp.services";
import { HashService } from "../services/hash.services";
import { UserService } from "../services/user.services";
import { TokenService } from "../services/token.services";

const router = Router();

const hashService = new HashService();
const otpService = new OtpService(hashService);
const userService = new UserService();
const tokenService = new TokenService();

const authController = new AuthController(
  otpService,
  hashService,
  userService,
  tokenService
);

router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);

export default router;
