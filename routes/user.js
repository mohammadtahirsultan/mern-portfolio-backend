import express from "express"
import { loginUser, logoutUser, updateUserProfile, deleteUserProfile, registerUser, getMyProfile, forgotPassword, resetPassword } from "../controller/user.js"
import { isAuthenticated } from "../auth/isAuthenticated.js"

const router = express.Router()

router.post("/user/register", registerUser)

router.post("/user/login", loginUser)

router.get("/user/profile", isAuthenticated, getMyProfile)

router.get("/user/logout", isAuthenticated, logoutUser)

router.put("/user/update", isAuthenticated, updateUserProfile)

// User Delete His Own Profile 
router.delete("/user/delete", isAuthenticated, deleteUserProfile)

router.post("/forgotpassword", forgotPassword)

router.put("/password/reset/:token", resetPassword)



export default router