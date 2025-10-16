import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected!!!")
    } catch (error) {
        console.log("mongodb connection refused", error.message)
    }
}