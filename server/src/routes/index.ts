import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { carRouter } from "./carRoutes";

export const router = Router();

router.use('/auth', authRoutes);
router.use('/cars', carRouter);

router.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: "Server is running" });
});