import jwt from "jsonwebtoken";

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
}
