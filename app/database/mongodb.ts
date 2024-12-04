// Connect to MongoDB

const MONGODB_URL_SECRET = process.env.MONGODB_URL;

import mongoose from "mongoose";

const connectMongoDB = () => {
    if (!MONGODB_URL_SECRET) {
        throw new Error("MONGODB_URL environment variable is not defined");
    }

    try {
        mongoose.connect(MONGODB_URL_SECRET);
        console.log("Connected to mMongoDB!");
    } catch (error) {
        console.error(error)
    }
};

export default connectMongoDB;
