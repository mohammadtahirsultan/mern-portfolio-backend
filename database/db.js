import mongoose from "mongoose";

const connectDB = async (req, res) => {

    try {

        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected With Database');
    } catch (error) {
        console.log(`Error Occured While Connecting With Database : ${error.message}`);
    }

}


export default connectDB;