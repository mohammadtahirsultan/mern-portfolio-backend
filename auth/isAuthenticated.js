import jwt from 'jsonwebtoken'
import User from "../models/user.js"

export const isAuthenticated = async (req, res, next) => {

    try {
        let cookieFound = req.headers.cookie
        cookieFound = cookieFound?.split("=")[1]

        if (!cookieFound) {
            return res.status(401).json({
                success: false,
                message: `Login First`
            })
        }

        const userToken = jwt.verify(cookieFound, process.env.JWT_TOKEN_SECRET);

        req.user = await User.findById(userToken._id)

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }

}




export const isAdmin = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(400).json({
            success: false,
            error: "Only Admin is Allowed to Access this Page!"
        })
    }
    

    next()
}