import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host} hooray x222!`);
    } catch (error) {
        console.log(error);
        process.exit(1); // 1 means error
    }
};
