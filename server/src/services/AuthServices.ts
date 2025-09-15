import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/user';
import { createUser, getUserByEmail, getUserByUsername } from '../db/operations/user-operations';

dotenv.config();

export class AuthServices {

    private jwtSecret = process.env.JWT_SECRET_KEY as string;

    async hashPassword(password: string): Promise<string> {
        const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }

    async authenticateToken(token: string): Promise<User | null> {
        if(!token) {
            throw new Error("No token provided");
        }

        try {
            const decoded = jwt.verify(token, this.jwtSecret);
            return decoded as User | null;
        } catch (error) {
            return null;
        }
    }

    async generateToken(payload: User): Promise<string> {
        const token = jwt.sign(payload, this.jwtSecret, { expiresIn: 24 * 60 * 60 * 30 }); // 30 days
        return token;
    }

    async refreshToken(token: string): Promise<string> {
        const decoded = await this.authenticateToken(token);
        if (!decoded) {
            throw new Error("Invalid token");
        }
        const newToken = await this.generateToken(decoded);
        return newToken;
    }

    async findUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
        if(!usernameOrEmail) {
            throw new Error("Username or email is required");
        }

        if(usernameOrEmail.includes('@')) {
            return await getUserByEmail(usernameOrEmail);
        }
        return await getUserByUsername(usernameOrEmail);
    }

    async login(usernameOrEmail: string, password: string): Promise<object> {
        if(!usernameOrEmail || !password) {
            throw new Error("Username or password is missing");
        }

        const user = await this.findUserByUsernameOrEmail(usernameOrEmail);

        if(!user) {
            throw new Error("Username or email and password do not match");
        }

        const isPasswordValid = await this.comparePassword(password, user.passwordHash);
        if(!isPasswordValid) {
            throw new Error("Username or email and password do not match");
        }
        const token = await this.generateToken(user);
        return {
            token: token
        };
    }

    async register(username: string, email: string, password: string, phoneNumber: string): Promise<object> {
        if(!username || !email || !password || !phoneNumber) {
            throw new Error("All fields are required");
        }
        try{
            const existingUser = await this.findUserByUsernameOrEmail(username);
            if(existingUser) {
                throw new Error("Username or email already taken");
            }
            const newUser = await createUser({
                username: username,
                email: email,
                passwordHash: await this.hashPassword(password),
                role: 'admin',
                totalPurchases: 0,
                phoneNumber: phoneNumber
            })

            const token = await this.generateToken(newUser);

            return {
                token: token
            };
        } catch (error) {
            console.error("Registration error:", error);
            return { message: error };
        }
    }

    async logout(token: string): Promise<void> {
        
    }


}

export const authServices = new AuthServices();

