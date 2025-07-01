import express from 'express'
import { addLearnCourseVideoController } from '../Controller/LearnCoursesController.js';



const LearnCoursesRoutes = express.Router();

LearnCoursesRoutes.post("/learn-Courses", addLearnCourseVideoController)

export default LearnCoursesRoutes