import Testimonial from "../models/testimonial.js";

export const addTestimonial = async (req, res) => {
    try {

        const { description } = req.body;

        if (!description) {
            return res.status(400).json({
                success: false,
                message: "Please Add Review ",
            })
        }

        let testimonial = await Testimonial.create({
            description, user: req.user
        })

        return res.status(201).json({
            success: true,
            message: "Thanks for Review",
            testimonial
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



export const getAllTestimonials = async (req, res) => {
    try {

        let testimonials = await Testimonial.find().populate("user")
        let testimonialsCount = await Testimonial.countDocuments()
        let approvedTestimonials = await Testimonial.find({ approved: true }).populate("user")

        return res.status(200).json({
            success: true,
            testimonials,
            testimonialsCount,
            approvedTestimonials
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const deleteTestimonial = async (req, res) => {
    try {

        let testimonial = await Testimonial.findById(req.params.id)

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: "Testimonial Not Found!"
            })
        }

        await Testimonial.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            success: true,
            message: "Review Deleted Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const approveTestimonial = async (req, res) => {
    try {

        console.log(req.params);
        let testimonial = await Testimonial.findById(req.params.id)

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: "Testimonial Not Found!"
            })
        }

        testimonial.approved = true;

        await testimonial.save()

        return res.status(200).json({
            success: true,
            message: "Review Approved Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

