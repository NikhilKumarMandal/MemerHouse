import { JwtPayload } from "jsonwebtoken";
import Mailgen from "mailgen";
import { ObjectId } from "mongodb";

export interface IBody {
  hash: string;
  otp: string;
  phone: string;
}

export interface IUser {
  email: string;
  password: string;
  username: string;
}

export interface UserDetails {
  _id: ObjectId;
  email: string;
  createdAt: Date;
  activated?: boolean | null;
  isVerified?: boolean | null;
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

export interface Room {
  topic: string;
  roomType: string;
  owner: string;
  speakers?: string[];
}

export interface Data {
  topic: string;
  roomType: string;
}

export interface SendEmailVerificationProps {
  req?: Request;
  email: string;
  subject: string;
  user?: string;
  mailgenContent: Mailgen.Content;
}

export interface MailgenContent {
  body: {
    name: string;
    intro: string;
    dictionary: {
      OTP: string;
    };
    outro: string;
  };
}
