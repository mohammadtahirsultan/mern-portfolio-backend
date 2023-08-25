import Project from "../models/project.js";
import cloudinary from 'cloudinary'

export const getAllProjects = async (req, res) => {

    try {

        let projects = await Project.find();

        let featuredProjects = await Project.find({ featured: true })

        let projectsCount = await Project.countDocuments()

        return res.status(200).json({
            success: true,
            projects,
            projectsCount,
            featuredProjects
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const getProjectDetail = async (req, res) => {

    try {

        let project = await Project.findById(req.params.id)

        return res.status(200).json({
            success: true,
            project
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


export const addNewProject = async (req, res) => {

    try {


        let cloudinaryRes;
        if (req.body.image) {
            cloudinaryRes = await cloudinary.v2.uploader.upload(req.body.image,
                {
                    folder: "Ghareebstar-Projects",
                },
            );
        }
        const { title, description, link, category } = req.body;


        let project = await Project.create({
            title, description, link, category, image: {
                public_id: cloudinaryRes.public_id,
                url: cloudinaryRes.secure_url
            }
        })

        return res.status(201).json({
            success: true,
            message: "Project Added Successfully",
            project
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


export const updateProject = async (req, res) => {

    try {



        const { title, description, link, category } = req.body;


        let project = await Project.findById(req.params.id)

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project Not Found"
            })
        }


        let cloudinaryRes;
        if (req.body.image) {
            if (project.image && project.image.public_id) {

                let projectImageId = project.image.public_id
                await cloudinary.v2.uploader.destroy(projectImageId)

                cloudinaryRes = await cloudinary.v2.uploader.upload(req.body.image,
                    {
                        folder: "Ghareebstar-Projects",
                    },
                );
            }


            project.image = {
                public_id: cloudinaryRes.public_id,
                url: cloudinaryRes.secure_url
            }
        }



        project = await Project.findByIdAndUpdate(req.params.id, {
            title, description, link, category, image: {
                public_id: cloudinaryRes.public_id,
                url: cloudinaryRes.secure_url
            }
        })

        return res.status(200).json({
            success: true,
            message: "Project Updated Successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const deleteProject = async (req, res) => {

    try {


        let project = await Project.findById(req.params.id)

        if (!project) {
            return res.status(404).json({
                success: false,
                error: "Project Not Found"
            })
        }


        await Project.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            success: true,
            message: "Project Deleted Successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}