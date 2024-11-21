import userModel from "../models/user.model";
import { IUser, UpdateData } from "../types/type";

export class UserService {
  async findUser(data: string) {
    const user = await userModel.findOne({ data });
    return user;
  }

  async createUser(data: IUser) {
    const user = await userModel.create(data);
    return await user.save();
  }

  async findById(userId: string) {
    return await userModel.findById(userId).select("-password -refreshToken");
  }

  async findByIdAndUpdate(userId: string, data: UpdateData) {
    const user = await userModel.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          ...data,
        },
      },
      {
        new: true,
      }
    );

    return user;
  }
}
