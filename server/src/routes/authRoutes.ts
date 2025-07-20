import { Router } from "express";
import { authController } from "../controller/authController";

export const authRoutes = Router();

authRoutes.post('/login', authController.login);
authRoutes.post('/register', authController.register);
authRoutes.get('/authenticate', authController.authenticate);
