import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const transcriptSchema = new Schema(
  {
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Transcript = mongoose.model("transcript", transcriptSchema);
