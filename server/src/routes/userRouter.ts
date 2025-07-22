import { Router } from "express";
import { userController } from "../controller/userController";
import { authMiddleware } from "../middleware/authMiddleware";

export const userRouter = Router();

userRouter.get('/user/:id', authMiddleware, userController.getUserById);
userRouter.post('/user/change-username', authMiddleware, userController.updateUsername);
userRouter.post('/user/change-password', authMiddleware, userController.changePassword);
userRouter.post('/user/change-phone', authMiddleware, userController.updatePhoneNumber);
userRouter.post('/user/change-email', authMiddleware, userController.updateEmail);
