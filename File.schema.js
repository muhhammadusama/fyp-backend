import mongoose from "mongoose";
const Schema = mongoose.Schema;
const fileSchema = new Schema({
  filename: String,
  mimetype: String,
  size: Number,
  buffer: Buffer, // Store binary data directly in the database
});

export const File = mongoose.model('File', fileSchema);