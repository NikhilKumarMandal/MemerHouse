import { Logger } from "winston";
import { UserDto } from "../dtos/user.dto";
import { HashService } from "../services/hash.services";
import { OtpService } from "../services/otp.services";
import { TokenService } from "../services/token.services";
import { UserService } from "../services/user.services";
import { DecodedToken } from "../types/type";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { CookieOptions, Request, Response } from "express";

export class AuthController {
  constructor(
    private otpService: OtpService,
    private hashService: HashService,
    private userService: UserService,
    private tokenService: TokenService,
    private logger: Logger
  ) {}

  sendOtp = asyncHandler(async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      throw new ApiError(
        400,
        "Phone number, username, and password are required!"
      );
    }

    const existedUser = await this.userService.findUser(email as string);

    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists");
    }

    const hashedPassword = await this.hashService.hashPassword(
      password as string
    );

    const userData = {
      email,
      username,
      password: hashedPassword,
    };

    const user = await this.userService.createUser(userData);

    const userId = user._id as unknown as string;
    const createdUser = await this.userService.findById(userId);

    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    const otp = this.otpService.genrateOtp();
    createdUser.otp = String(otp);

    const timeToLeave: number = 1000 * 60 * 2; // 2min
    const expires = Date.now() + timeToLeave;

    createdUser.otpExpire = new Date(expires);
    await createdUser.save({ validateBeforeSave: false });
    // const data = `${phone}.${otp}.${expires}`;

    // const hash = this.hashService.hashOtp(data);
    // const hashedOtp = `${hash}.${expires}`;
    if (!createdUser?.username) {
      throw new Error("Username is required to verify email.");
    }

    try {
      const mailgenContent = this.otpService.verifyEmail(
        createdUser.username,
        String(otp)
      );
      console.log("Mailgen Content:", mailgenContent); // Log to check the generated content

      const email = await this.otpService.sendEmail({
        email: createdUser.email,
        subject: "Verify email",
        mailgenContent: mailgenContent,
      });

      console.log("Email sent:", email); // If the email is sent successfully

      res
        .status(200)
        .json(new ApiResponse(200, createdUser, "OTP sent successfully"));
    } catch (error) {
      console.error("Error sending OTP:", error); // Log the error
      throw new ApiError(500, "Something went wrong while sending OTP");
    }
  });

  verifyOtp = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { otp } = req.body;

    if (!otp) {
      throw new ApiError(400, "OTP is required!");
    }

    const user = await this.userService.findById(id);

    if (!user) {
      throw new ApiError(400, "User does not exits!!!");
    }

    if (user.isVerified) {
      throw new ApiError(400, "User is already verified");
    }

    if (user.otp !== otp) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Invalid OTP, new OTP sent to your email"));
    }

    // Check if OTP is expired
    const currentTime = Date.now();
    const expirationTime = user?.otpExpire
      ? new Date(user.otpExpire).getTime()
      : 0;

    if (currentTime > expirationTime) {
      return res.status(400).json(new ApiResponse(400, "OTP expired"));
    }

    const { refreshToken, accessToken } = this.tokenService.genrateToken({
      _id: id,
    });

    await this.tokenService.savetoken(refreshToken, id);

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

    const userDto = new UserDto(user);

    res
      .status(200)
      .cookie("accessToken", accessToken, accessCookie)
      .cookie("refreshToken", refreshToken, refreshCookie)
      .json(new ApiResponse(200, userDto, "User created Successfully"));
  });

  genrateRefreshAndAccessToken = asyncHandler(
    async (req: Request, res: Response) => {
      const incomingRefreshToken = req.cookies.refreshToken as string;

      if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
      }

      try {
        const decodedToken = this.tokenService.verifyRefreshToken(
          incomingRefreshToken
        ) as unknown as DecodedToken;

        const userId = decodedToken?.id;

        if (!userId) {
          throw new ApiError(409, "Invalid token payload");
        }

        const user = await this.userService.findById(userId);

        if (!user) {
          throw new ApiError(409, "User does not exist!");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
          throw new ApiError(409, "Refresh token is expired or invalid");
        }

        const { refreshToken: newRefreshToken, accessToken } =
          this.tokenService.genrateToken({
            _id: userId,
          });

        await this.tokenService.savetoken(newRefreshToken, userId);

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
          .cookie("refreshToken", newRefreshToken, refreshCookie)
          .json(
            new ApiResponse(
              200,
              {
                accessToken,
                refreshToken: newRefreshToken,
              },
              "Token refresh successfulyy"
            )
          );
      } catch (error) {
        this.logger.error(error);
        throw new ApiError(
          500,
          "Something went wrong while generating the refresh token!"
        );
      }
    }
  );
}
