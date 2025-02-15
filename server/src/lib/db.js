import mongoose from "mongoose";

export const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connected Successfully : ${conn.connection.host}`)
}