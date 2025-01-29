import express from 'express';
import { registerController, loginController, getUserProfileController, logoutController, updateProfileConroller, updatePasswordController, updateProfilePicController} from '../controllers/userController.js';
import { isAuth } from '../middlewares/AutheMiddleware.js';
import { singleUpload } from '../middlewares/multer.js';

// router object
const userRouter = express.Router()

// routes
// router.get('/', homeController)
userRouter.post('/register', registerController);
//login route
userRouter.post('/login', loginController);
// profiel
userRouter.get('/profile', isAuth, getUserProfileController);
// logout 
userRouter.get('/logout', isAuth, logoutController)

// update profile
userRouter.put('/update-profile', isAuth, updateProfileConroller);
// update password
userRouter.put('/update-password',isAuth, updatePasswordController);


// update profile pic
userRouter.put('/update-picture', isAuth, singleUpload, updateProfilePicController)
export default userRouter;