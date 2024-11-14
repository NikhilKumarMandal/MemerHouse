import roomModel from "../models/room.model";
import { Room } from "../types/type";

export class RoomService {
  async create(playload: Room) {
    const { owner, roomType, topic } = playload;
    const room = await roomModel.create({
      topic,
      roomType,
      owner,
      speakers: [owner],
    });
    return await room.save();
  }
}