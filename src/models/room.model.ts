import mongoose, { Schema } from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    speakers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Room", roomSchema);
