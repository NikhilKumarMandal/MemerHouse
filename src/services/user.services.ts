import userModel from "../models/user.model";

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
}
