import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongodb";

export interface IBody {
  hash: string;
  otp: string;
  phone: string;
}

export interface UserDetails {
  _id: ObjectId;
  phone: string;
  createdAt: Date;
  activated?: boolean | null;
}

export interface UpdateData {
  name: string;
  avatar: {
    public_id: string;
    url: string;
  };
}

export interface DecodedToken extends JwtPayload {
  id: string;
}

export interface AuthenticatedRequest extends Request {
  cookies: {
    refreshToken?: string;
  };
}
