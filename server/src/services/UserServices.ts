import * as userOperations from "../db/operations/user-operations";
import { User } from "../models/user";
import { authServices } from "./AuthServices";

export class UserServices {

    async getUserById(id: string): Promise<User | null> {
        return userOperations.getUserById(id);
    }

    async deleteUser(id: string): Promise<User | null> {
        try {
            const user = await this.getUserById(id);
            if (!user) {
                return null;
            }
            await userOperations.deleteUser(id);
            return user;
        } catch (error) {
            console.error("Error deleting user:", error);
            return null;
        }
    }

    async getUserByUsername(username: string): Promise<User | null> {
        return userOperations.getUserByUsername(username);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return userOperations.getUserByEmail(email);
    }

    async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
        return userOperations.updateUser(id, userData);
    }

    async updateEmail(email: string, newEmail: string): Promise<User | null> {
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        return userOperations.updateEmail(user.id, newEmail);
    }

    async updateUsername(email: string, newUsername: string): Promise<User | null> {
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        return userOperations.updateUsername(user.id, newUsername);
    }

    async updatePhoneNumber(email: string, newPhoneNumber: string): Promise<User | null> {
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        return userOperations.updatePhoneNumber(user.id, newPhoneNumber);
    }

    async changePassword(email: string, oldPassword: string,newPassword: string): Promise<User | null> {
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        try{
            const isPasswordValid = await authServices.comparePassword(oldPassword, user.passwordHash);
            if (!isPasswordValid) {
                console.error("Invalid password attempt for user:", email);
                return null;
            }
            const hashedPassword = await authServices.hashPassword(newPassword);
            return userOperations.changePassword(user.id, hashedPassword);
        } catch (error) {
            console.error("Error changing password:", error);
            return null;
        }

    }
    
}

export const userServices = new UserServices();
