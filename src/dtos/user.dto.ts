import { UserDetails } from "../types/type";

export class UserDto {
  _id: string;
  phone: string;
  createdAt: Date;
  activated?: boolean | null;

  constructor(user: UserDetails) {
    this._id = user._id.toString();
    this.phone = user.phone;
    this.createdAt = user.createdAt;
    this.activated = user.activated;
  }
}
