// Connect to MongoDB

import mongoose from "mongoose";

const MONGODB_URL_SECRET = process.env.MONGODB_URL;

const connectMongoDB = async () => {
    if (!MONGODB_URL_SECRET) {
        throw new Error("MONGODB_URL environment variable is not defined");
    };

    try {
        await mongoose.connect(MONGODB_URL_SECRET);
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error(error)
    };
};

export default connectMongoDB;
