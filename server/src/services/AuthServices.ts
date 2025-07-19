import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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

    async authenticateToken(token: string): Promise<string | jwt.JwtPayload> {
        if(!token) {
            throw new Error("No token provided");
        }

        try {
            const decoded = jwt.verify(token, this.jwtSecret);
            return decoded;
        } catch (error) {
            throw new Error("Invalid token");
        }
    }

    async generateToken(payload: object): Promise<string> {
        const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
        return token;
    }

}
