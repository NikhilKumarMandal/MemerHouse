// import { Logger } from "winston";
// import { RoomService } from "../services/room.services";
// import { ApiError } from "../utils/ApiError";
// import { asyncHandler } from "../utils/asyncHandler";
// import { Request, Response } from "express";
// import { ApiResponse } from "../utils/ApiResponse";
// import { Data } from "../types/type";

// export class RoomController {
//   constructor(
//     private roomService: RoomService,
//     private logger: Logger
//   ) {}

//   create = asyncHandler(async (req: Request, res: Response) => {
//     const { topic, roomType } = req.body as Data;

//     if (!topic || !roomType) {
//       throw new ApiError(400, "All fileds are required!");
//     }
//     const owner = (req.user as { _id: string })?._id;

//     const roomData = {
//       topic,
//       roomType,
//       owner,
//       speakers: [owner],
//     };

//     const room = await this.roomService.create(roomData);

//     this.logger.info("Room created succcessfully");

//     return res
//       .status(200)
//       .json(new ApiResponse(200, room, "Room created successfully"));
//   });

//   // Todo: Improve this contoller later:-
//   index = asyncHandler(async (req: Request, res: Response) => {
//     const room = await this.roomService.getAllRooms(["open"]);

//     return res
//       .status(200)
//       .json(new ApiResponse(200, room, "Fected rooms successfully"));
//   });
// }
