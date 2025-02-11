import express from "express";
import { isAuth } from '../middlewares/AutheMiddleware.js';
import { fetchUserCourse } from "../controllers/fetchCoursesControllers.js";


const fetchcourseRouter = express.Router();

fetchcourseRouter.get("/fetch-Course", isAuth ,fetchUserCourse);

export default fetchcourseRouter;