import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB CONNECTED: ", conn.connection.host);
    }catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}