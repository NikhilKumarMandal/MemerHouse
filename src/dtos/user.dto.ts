import { UserDetails } from "../types/type";

export class UserDto {
  _id: string;
  email: string;
  createdAt: Date;
  activated?: boolean | null;
  isVerified?: boolean | null;

  constructor(user: UserDetails) {
    this._id = user._id.toString();
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.activated = user.activated;
    this.isVerified = user.isVerified;
  }
}
