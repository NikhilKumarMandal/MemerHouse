import jwt from "jsonwebtoken";
import tokenModel from "../models/token.model";
import { DecodedToken } from "../types/type";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

interface Payload {
  _id: string;
}

export class TokenService {
  genrateToken(playload: Payload): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = jwt.sign(playload, accessTokenSecret!, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(playload, refreshTokenSecret!, {
      expiresIn: "10d",
    });

    return { accessToken, refreshToken };
  }

  async savetoken(refreshToken: string, userId: string) {
    const token = await tokenModel.create({
      refreshToken,
      userId,
    });
    const savedToken = await token.save();
    return savedToken;
  }

  verifyToken(token: string) {
    return jwt.verify(token, accessTokenSecret!) as DecodedToken;
  }
}
