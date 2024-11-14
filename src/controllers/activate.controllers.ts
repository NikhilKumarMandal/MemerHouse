import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { UserService } from "../services/user.services";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { ApiResponse } from "../utils/ApiResponse";

export class ActivateController {
  constructor(private userService: UserService) {}

  activate = asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
      throw new ApiError(400, "Name filed is required!");
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const avatarLocalPath = files?.thumbnail?.[0]?.path;
    if (!avatarLocalPath) {
      throw new ApiError(400, "AvatarLocalPath is required");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
      throw new ApiError(400, "Avatr is required!");
    }

    const userId = (req.user as { _id: string })?._id;
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new ApiError(404, "User does not found!");
    }
    user.activated = true;

    const updateUser = await this.userService.findByIdAndUpdate(userId, {
      name,
      avatar: {
        public_id: avatar?.public_id,
        url: avatar?.url,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, updateUser, "User activated successfully"));
  });
}
