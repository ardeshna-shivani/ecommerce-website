
import express from 'express';
// import {Router} from 'express';
import { forgotPasswordController, loginUserController, logoutController, refreshToken, registerUserController, removeImagefromCloudinary, resetPassword, updateUserDetails, userAvatarController, userDetails, verifyEmailController, verifyforgotPasswordOtp } from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.post('/register',registerUserController);
userRouter.post('/verifyEmail',verifyEmailController);
userRouter.post('/login',loginUserController);
userRouter.get('/logout',auth,logoutController);
userRouter.put('/user-avatar',auth,upload.array('avatar'),userAvatarController);
userRouter.delete('/deleteImage',auth,removeImagefromCloudinary);
userRouter.put('/:id',auth,updateUserDetails);
userRouter.post('/forgot-password',forgotPasswordController);
userRouter.post('/verify-forgot-password-otp',verifyforgotPasswordOtp);
userRouter.post('/reset-password',resetPassword);
userRouter.post('/refresh-token',refreshToken);
userRouter.get('/user-details',auth,userDetails);
export default userRouter;
