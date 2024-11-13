import { HashService } from "../services/hash.services";
import { OtpService } from "../services/otp.services";
import { TokenService } from "../services/token.services";
import { UserService } from "../services/user.services";
import { IBody } from "../types/type";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { CookieOptions, Request, Response } from "express";

export class AuthController {
  constructor(
    private otpService: OtpService,
    private hashService: HashService,
    private userService: UserService,
    private tokenService: TokenService
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

  verifyOtp = asyncHandler(async (req: Request, res: Response) => {
    const { hash, otp, phone } = req.body as IBody;

    if (!hash || !otp || !phone) {
      throw new ApiError(400, "All fileds are required!");
    }

    const [hasedOtp, expires] = hash.split(".");

    if (Date.now() > +expires) {
      throw new ApiError(400, "OTP expires!");
    }

    const data = `${phone}.${otp}.${expires}`;

    const isValid = this.otpService.verifyOtp(hasedOtp, data);

    if (!isValid) {
      throw new ApiError(400, "Invalid OTP!");
    }

    const existingUser = await this.userService.findUser(phone);
    if (existingUser) {
      throw new ApiError(409, "User with this phone no. already exists");
    }

    const user = await this.userService.createUser(phone);

    const userId = user._id.toString();

    const { refreshToken, accessToken } = this.tokenService.genrateToken({
      _id: userId,
    });

    const accessCookie: CookieOptions = {
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
    };

    const refreshCookie: CookieOptions = {
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 10, // 10 days
      httpOnly: true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, accessCookie)
      .cookie("refreshToken", refreshToken, refreshCookie)
      .json(new ApiResponse(200, user, "User created Successfully"));
  });
}
