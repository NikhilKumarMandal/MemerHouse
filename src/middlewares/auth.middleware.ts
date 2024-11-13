import { NextFunction, Request } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { TokenService } from "../services/token.services";
import { JwtPayload } from "jsonwebtoken";
import { UserService } from "../services/user.services";

const tokenService = new TokenService();
const userService = new UserService();

export const verifyJWT = asyncHandler(
  async (req: Request, _, next: NextFunction) => {
    try {
      const { accessToken } = req.cookies;
      if (!accessToken) {
        throw new ApiError(401, "Token does not found!");
      }

      const decodedToken = tokenService.verifyToken(accessToken as string);

      const userId = (decodedToken as unknown as JwtPayload).id as string;

      const user = await userService.findById(userId);

      if (!user) {
        throw new ApiError(404, "User does not exist!");
      }

      req.user = user;
      next();
    } catch {
      next(new ApiError(401, "Invalid access token"));
    }
  }
);
