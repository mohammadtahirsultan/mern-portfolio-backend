import mongoose from "mongoose";

// What type of data , we want to store , is called Schema . 
// Internet Can not Help Us Today 😅😥

const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
            required: true
        }
    },
    featured: {
        type: Boolean,
        default: false
    }

})


const Project = mongoose.model("Project", projectSchema)


export default Project