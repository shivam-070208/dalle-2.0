import mongoose from "mongoose";
import *as dotenv from 'dotenv';
dotenv.config()
const connectDB = async () => {
    mongoose.set("strictQuery", true);
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
    }

export default connectDB;