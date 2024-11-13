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
