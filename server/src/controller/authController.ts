import { Response } from "express";
import { AuthRequest } from "../models/requests/AuthRequest";
import { authServices } from "../services/AuthServices";

export class AuthController {
    async login(req: AuthRequest, res: Response): Promise<void> {
        const { usernameOrEmail, password } = req.body;
        if (!usernameOrEmail || !password) {
            res.status(400).json({ message: "Username or password is missing" });
            return;
        }
        try {
            const token = await authServices.login(usernameOrEmail, password);
            res.cookie("token", token, { httpOnly: true });
            res.status(200).json(token);
            return;
        } catch (error) {
            console.error("Login error:", error);
            res.status(401).json({ message: error });
            return;
        }
    }

    async register(req: AuthRequest, res: Response): Promise<void> {
        const { username, email, password, phoneNumber } = req.body;
        if (!username || !email || !password || !phoneNumber) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        try {
            const newUser = await authServices.register(username, email, password, phoneNumber);
            res.status(201).json(newUser);
            return;
        } catch (error) {
            console.error("Registration error:", error);
            res.status(400).json({ message: error });
            return;
        }
    }

    async authenticate(req: AuthRequest, res: Response): Promise<void> {
        const authHeaders = req.headers.authorization;
        const token = authHeaders && authHeaders.startsWith('Bearer ') ? authHeaders.split(' ')[1] : null;

        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        try{
            const user = await authServices.authenticateToken(token);
            if (!user) {
                res.status(401).json({ message: "Invalid token" });
                return;
            }
            req.user = user;
            res.status(200).json(user);

        } catch (error) {
            console.error("Authentication error:", error);
            res.status(500).json({ message: error });
        }


    }
    
}

export const authController = new AuthController();