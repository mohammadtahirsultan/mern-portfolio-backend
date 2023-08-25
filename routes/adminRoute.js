


import express from "express"
import {  getAllUsers, getUserDetail, updateUserProfileAdmin, deleteUserProfileAdmin } from "../controller/adminRoute.js"
import { isAdmin, isAuthenticated } from "../auth/isAuthenticated.js"

const router = express.Router()



// Admin Routes Only 


router.get("/users", isAuthenticated, isAdmin, getAllUsers)

// router.get("/user/:id", isAuthenticated, isAdmin, getUserDetail)

// router.put("/user/:id", isAuthenticated, isAdmin, updateUserProfileAdmin)

// router.delete("/user/:id", isAuthenticated, isAdmin, deleteeUserProfileAdmin)


router.route("/user/:id").get(isAuthenticated, isAdmin, getUserDetail).put(isAuthenticated,isAdmin,updateUserProfileAdmin).delete(isAuthenticated, isAdmin, deleteUserProfileAdmin)





export default router