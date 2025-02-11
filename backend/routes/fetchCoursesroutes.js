import express from "express";
import { isAuth } from '../middlewares/AutheMiddleware.js';


const fetchcourseRouter = express.Router();

fetchcourseRouter.post("/fetch-Course", isAuth ,fetchCpurseController);

export default fetchcourseRouter;