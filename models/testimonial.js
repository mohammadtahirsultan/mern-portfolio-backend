import mongoose from "mongoose";


const testimonialSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    approved: {
        type: Boolean,
        default: false
    }




})


const Testimonial = mongoose.model("Testimonial", testimonialSchema)


export default Testimonial