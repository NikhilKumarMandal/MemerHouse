// import { NextFunction, Request } from "express";
// import { asyncHandler } from "../utils/asyncHandler";
// import { ApiError } from "../utils/ApiError";
// import { TokenService } from "../services/token.services";
// import { UserService } from "../services/user.services";
// import { DecodedToken } from "../types/type";

// const tokenService = new TokenService();
// const userService = new UserService();

// export const verifyJWT = asyncHandler(
//   async (req: Request, _, next: NextFunction) => {
//     try {
//       const accessToken = req.cookies.accessToken as string;
//       if (!accessToken) {
//         throw new ApiError(401, "Token does not found!");
//       }

//       const decodedToken = tokenService.verifyToken(
//         accessToken
//       ) as unknown as DecodedToken;

//       const userId = decodedToken.id;

//       const user = await userService.findById(userId);

//       if (!user) {
//         throw new ApiError(404, "User does not exist!");
//       }

//       req.user = user;
//       next();
//     } catch {
//       next(new ApiError(401, "Invalid access token"));
//     }
//   }
// );
