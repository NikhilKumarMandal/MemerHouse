import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";
import { OtpService } from "../services/otp.services";
import { HashService } from "../services/hash.services";
import { UserService } from "../services/user.services";
import { TokenService } from "../services/token.services";
// import { ActivateController } from "../controllers/activate.controllers";
import logger from "../utils/logger";
// import { verifyJWT } from "../middlewares/auth.middleware";
// import { upload } from "../middlewares/multer.middleware";

const router = Router();

const hashService = new HashService();
const otpService = new OtpService(hashService);
const userService = new UserService();
const tokenService = new TokenService();

const authController = new AuthController(
  otpService,
  hashService,
  userService,
  tokenService,
  logger
);

// const activateController = new ActivateController(userService);

router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp/:id", authController.verifyOtp);

// router.post(
//   "/activate",
//   verifyJWT,
//   upload.fields([
//     {
//       name: "avatar",
//       maxCount: 1,
//     },
//   ]),
//   activateController.activate
// );

// router.post(
//   "/refreshToken",
//   verifyJWT,
//   authController.genrateRefreshAndAccessToken
// );

export default router;
