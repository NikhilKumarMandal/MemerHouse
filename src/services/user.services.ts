import userModel from "../models/user.model";
import { UpdateData } from "../types/type";

export class UserService {
  async findUser(data: string) {
    const user = await userModel.findOne({ data });
    return user;
  }

  async createUser(data: string) {
    const user = await userModel.create({ data });
    const savedUser = await user.save();
    return savedUser;
  }

  async findById(userId: string) {
    return await userModel.findById(userId);
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
