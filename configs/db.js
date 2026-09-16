import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const primaryUri = process.env.MONGODB_URI;
        const uris = [primaryUri].filter(Boolean);

        if (uris.length === 0) {
            throw new Error("No MongoDB URI found. Set MONGODB_URI or MONGODB_LOCAL_URI in .env.");
        }

        const isPlaceholderUri = (uri) => typeof uri === "string" && (
            uri.includes("YOUR_PASSWORD") ||
            uri.includes("YOUR_ACTUAL_PASSWORD") ||
            uri.includes("<db_password>") ||
            uri.includes("<password>")
        );

        for (const uri of uris) {
            try {
                if (isPlaceholderUri(uri)) {
                    throw new Error("MONGODB_URI contains a placeholder password. Set the Atlas database user's password in .env.");
                }

                console.log(`connecting to db: ${uri.startsWith("mongodb+srv://") ? "mongodb+srv://***" : uri}`)
                await mongoose.connect(uri, {
                    serverSelectionTimeoutMS: 5000,
                    connectTimeoutMS: 5000,
                })
                console.log("connected to db")
                return
            }
            catch (error) {
                console.error(`failed to connect using ${uri.startsWith("mongodb+srv://") ? "mongodb+srv://***" : uri}:`, error.message)

                throw new Error(`Database connection failed. ${error.message}`)
            }
        }
    }
    catch(error){
        console.error("database connection failed:", error)
        throw error
    }
}

export default connectDB ;      