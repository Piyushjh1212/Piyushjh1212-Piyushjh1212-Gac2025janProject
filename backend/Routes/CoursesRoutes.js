import express from "express";
import { Addcourses, getMyCourses } from "../Controller/CoursesController.js";

const CoursesRoutes = express.Router();

CoursesRoutes.post("/Courses", Addcourses);


CoursesRoutes.get("/getMyCourses", getMyCourses);



export default CoursesRoutes;