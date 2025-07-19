import { db } from "../db";
import { users } from "../schema/user";
import { eq } from "drizzle-orm";
import { User } from "../../models/user"

export const getUserByUsername = async (username: string): Promise<User | null> => {
    const user = await db.select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1)
        .then(rows => rows[0]);
    return user ? {
        id: user.id,
        username: user.username,
        email: user.email,
        passwordHash: user.passwordHash,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        role: user.role as 'user' | 'admin',
        totalPurchases: user.totalPurchases,
    } : null;
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const user = await db.select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1)
        .then(rows => rows[0]);
    return user ? {
        id: user.id,
        username: user.username,
        email: user.email,
        passwordHash: user.passwordHash,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        role: user.role as 'user' | 'admin',
        totalPurchases: user.totalPurchases,
    } : null;
}

export const getUserById = async (id: string): Promise<User | null> => {
    const user = await db.select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1)
        .then(rows => rows[0]);
    return user ? {
        id: user.id,
        username: user.username,
        email: user.email,
        passwordHash: user.passwordHash,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        role: user.role as 'user' | 'admin',
        totalPurchases: user.totalPurchases,
    } : null;
}

export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    const newUser: User = {
        id: crypto.randomUUID(),
        username: userData.username,
        email: userData.email,
        passwordHash: userData.passwordHash,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        role: userData.role || 'user',
        totalPurchases: 0, 
    }

    await db.insert(users).values(newUser);
    return newUser;
}