import User from "../models/user.js";
import cloudinary from 'cloudinary'


// Admin Routes Only 

export const getAllUsers = async (req, res) => {


    try {

        let users = await User.find();
        let usersCount = await User.countDocuments()

        return res.status(200).json({
            success: true,
            users,
            usersCount
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }

}

export const getUserDetail = async (req, res) => {

    try {

        let user = await User.findById(req.params.id);


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            user,
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}




export const updateUserProfileAdmin = async (req, res) => {
    try {

        let user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }


        const { role } = req.body;

        user.role = role;

        await user.save()


        return res.status(200).json({
            success: true,
            message: "User Updated Successfully"
        })



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



export const deleteUserProfileAdmin = async (req, res) => {
    try {

        let user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        let userImageId = user.image.public_id
        await cloudinary.v2.uploader.destroy(userImageId)

        await User.deleteOne(user)

        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}