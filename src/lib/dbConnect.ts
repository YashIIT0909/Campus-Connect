import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        return;
    }
    try {

        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables.");
        }

        const db = await mongoose.connect(process.env.MONGODB_URI);

        connection.isConnected = db.connections[0].readyState;
        console.log("Connection Successful:", connection.isConnected);

    } catch (error) {

        console.log("Connection Failed:", error);

        process.exit(1);


    }
}

export default dbConnect;