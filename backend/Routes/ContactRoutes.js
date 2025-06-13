import express from "express";
import { AddCourses, getMyCourses } from "../Controller/CoursesController.js";


const CoursesRoutes = express.Router();

CoursesRoutes.post("/My_courses", AddCourses);
CoursesRoutes.get("/get_My_courses" , getMyCourses);

export default CoursesRoutes;
