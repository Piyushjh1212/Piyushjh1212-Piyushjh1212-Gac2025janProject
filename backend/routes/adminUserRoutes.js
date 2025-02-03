import express from 'express';
import { createAdminUserController, loginAdminUserController } from '../controllers/adminUserController.js';

const adminUserRouter = express.Router();

adminUserRouter.post('/create-admin', createAdminUserController);
adminUserRouter.post('/login-admin', loginAdminUserController);

export default adminUserRouter;