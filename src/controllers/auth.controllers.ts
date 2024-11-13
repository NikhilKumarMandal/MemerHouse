import { HashService } from "../services/hash.services";
import { OtpService } from "../services/otp.services";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";

export class AuthController {
  constructor(
    private otpService: OtpService,
    private hashService: HashService
  ) {}

  sendOtp = asyncHandler(async (req: Request, res: Response) => {
    const { phone } = req.body;

    if (!phone) {
      throw new ApiError(400, "Phone number is required!");
    }

    const otp = this.otpService.genrateOtp();

    const timeToLeave: number = 1000 * 60 * 2; // 2min
    const expires = Date.now() + timeToLeave;

    const data = `${phone}.${otp}.${expires}`;

    const hash = this.hashService.hashOtp(data);
    const hashedOtp = `${hash}.${expires}`;

    try {
      await this.otpService.sendBySms(phone as string, otp);

      res.status(200).json(
        new ApiResponse(
          200,
          {
            hashedOtp,
            phone,
          },
          "OTP sent successfully"
        )
      );
    } catch {
      throw new ApiError(500, "Something went wrong while sending OTP");
    }
  });
}
