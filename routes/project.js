import express from "express"
import { addNewProject, updateProject, getAllProjects, deleteProject, getProjectDetail } from "../controller/project.js"

const router = express.Router()


router.get("/projects", getAllProjects)


router.post("/project/new", addNewProject)

router.get("/project/:id", getProjectDetail)

router.put("/project/update/:id", updateProject)

router.delete("/project/delete/:id", deleteProject)



export default router