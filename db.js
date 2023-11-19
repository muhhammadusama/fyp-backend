/*****  Packages  *****/
import mongoose from "mongoose";
/*****  Modules  *****/
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://admin-muneeb:admin-muneeb@cluster0.ks9vi.mongodb.net/?retryWrites=true&w=majority', {});
    console.log(`MongoDB Connected ${conn.connection.host}`)
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1)
  }
}

export default connectDB
