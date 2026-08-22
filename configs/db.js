import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const primaryUri = process.env.MONGODB_URI;
        const fallbackUri = process.env.MONGODB_LOCAL_URI || "mongodb://127.0.0.1:27017/quick-show";
        const uris = [primaryUri, fallbackUri].filter(Boolean);

        for (const uri of uris) {
            try {
                await mongoose.connect(uri)
                console.log("connected to db")
                return
            }
            catch (error) {
                if (uri === uris[uris.length - 1]) {
                    throw error
                }
            }
        }
    }
    catch(error){
        console.error("database connection failed:", error)
        throw error
    }
}

export default connectDB ;      