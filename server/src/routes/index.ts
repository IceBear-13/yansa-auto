import { Router } from "express";
import { authRoutes } from "./authRoutes";


export const router = Router();

router.use('/auth', authRoutes);

router.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: "Server is running" });
});