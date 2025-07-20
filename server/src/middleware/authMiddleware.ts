import { AuthRequest } from "../models/requests/AuthRequest";
import { NextFunction, Response } from "express";
import { authServices } from "../services/AuthServices";

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;
    const token = authHeaders && authHeaders.startsWith('Bearer ') ? authHeaders.split(' ')[1] : null;
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const user = await authServices.authenticateToken(token);
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const requireAdminRoles = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden: Admin role required" });
    }
    next(); 
}