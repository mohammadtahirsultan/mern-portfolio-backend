
import express from "express"
import { addTestimonial, getAllTestimonials, deleteTestimonial, approveTestimonial } from "../controller/testimonial.js";
import { isAdmin, isAuthenticated } from "../auth/isAuthenticated.js";


const router = express.Router()

router.get("/testimonials", getAllTestimonials)

router.post("/testimonial/add", isAuthenticated, addTestimonial)

router.put("/testimonial/:id", approveTestimonial)

router.delete("/testimonial/:id", isAuthenticated,isAdmin, deleteTestimonial)



export default router;