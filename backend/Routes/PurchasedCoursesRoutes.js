import express from 'express'
import { isAuth } from "../Middlewear/UserAuth.js";
import { PurchasedCourseController } from '../Controller/PurchasedCourseController.js'


const PurchasedCourseRoutes = express.Router();

PurchasedCourseRoutes.get('/Get-Purchased-Course', isAuth, PurchasedCourseController);

export default PurchasedCourseRoutes;