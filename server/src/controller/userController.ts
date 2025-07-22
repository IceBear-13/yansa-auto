import { userServices } from "../services/UserServices";
import { AuthRequest } from "../models/requests/AuthRequest";
import { Response } from "express";
import { deleteUser } from "../db/operations/user-operations";

export class UserController {
    async getUserById(req: AuthRequest, res: Response) {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden: Admin role required" });
        }

        try {
            const userId = req.params.id;
            const user = await userServices.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateUsername(req: AuthRequest, res: Response) {
        if (!req.user) {
            return res.status(403).json({ message: "Forbidden: You can only update your own username" });
        }
        try {
            const userId = req.user.id;
            const newUsername = req.body.username;
            const updatedUser = await userServices.updateUsername(userId, newUsername);
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Error updating username:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async changePassword(req: AuthRequest, res: Response) {
        if (!req.user) {
            return res.status(403).json({ message: "Forbidden: You can only change your own password" });
        }
        try {
            const userId = req.user.id;
            const { oldPassword, newPassword } = req.body;
            const updatedUser = await userServices.changePassword(userId, oldPassword, newPassword);
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found or invalid password" });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Error changing password:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async updatePhoneNumber(req: AuthRequest, res: Response) {
        if (!req.user) {
            return res.status(403).json({ message: "Forbidden: You can only update your own phone number" });
        }
        try {
            const userId = req.user.id;
            const newPhoneNumber = req.body.phoneNumber;
            const updatedUser = await userServices.updatePhoneNumber(userId, newPhoneNumber);
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Error updating phone number:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateEmail(req: AuthRequest, res: Response) {
        if (!req.user) {
            return res.status(403).json({ message: "Forbidden: You can only update your own email" });
        }
        try {
            const userId = req.user.id;
            const newEmail = req.body.email;
            const updatedUser = await userServices.updateEmail(userId, newEmail);
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Error updating email:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getUserByUsername(req: AuthRequest, res: Response) {
        const username = req.params.username;
        try {
            const user = await userServices.getUserByUsername(username);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error("Error fetching user by username:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getUserByEmail(req: AuthRequest, res: Response) {
        const email = req.params.email;
        try {
            const user = await userServices.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error("Error fetching user by email:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteUser(req: AuthRequest, res: Response) {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden: Admin role required" });
        }

        const userId = req.params.id;
        try {
            const deletedUser = await userServices.deleteUser(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }


}

export const userController = new UserController();