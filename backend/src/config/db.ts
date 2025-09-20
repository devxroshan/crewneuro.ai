import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string || 'mongodb://localhost:27017/crewneuro');
        console.log('MongoDB connected successfully');
    } catch (error) {
        if(error instanceof mongoose.Error && process.env.NODE_ENV !== 'production'){
            console.error(`MongoDB connection error: ${error.message}`);
            return;
        }
        console.error('Database connection failed');
    }
}

export default connectDB;