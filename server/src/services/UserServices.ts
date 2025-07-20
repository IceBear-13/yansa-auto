import * as userOperations from "../db/operations/user-operations";
import { User } from "../models/user";
import { authServices } from "./AuthServices";

export class UserServices {

    async getUserById(id: string): Promise<User | null> {
        return userOperations.getUserById(id);
    }

    async deleteUser(id: string): Promise<void> {
        return userOperations.deleteUser(id);
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

    async changePassword(email: string, newPassword: string): Promise<User | null> {
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const hashedPassword = await authServices.hashPassword(newPassword);
        return userOperations.changePassword(user.id, hashedPassword);
    }
    
}