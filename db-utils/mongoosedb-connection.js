import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const dbUrl = "localhost:27017";

const dbName = process.env.DB_NAME || "";

const dbUser = process.env.DB_USERNAME || "";

const dbPassword = process.env.DB_PASSWORD || "";

const dbCluster = process.env.DB_CLUSTER || "";

const cloudUrl = `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

const connectToMongoose = async () => {
    try {
        await mongoose.connect(cloudUrl);
        console.log("Mongoose Connected Successfully");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};


export default connectToMongoose;