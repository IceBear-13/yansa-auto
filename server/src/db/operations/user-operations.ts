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
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
        role: user.role as 'user' | 'admin',
        totalPurchases: user.totalPurchases,
        phoneNumber: user.phoneNumber,
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
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
        role: user.role as 'user' | 'admin',
        totalPurchases: user.totalPurchases,
        phoneNumber: user.phoneNumber,
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
        createdAt: new Date(user.createdAt),
        updatedAt: new Date (user.updatedAt),
        role: user.role as 'user' | 'admin',
        totalPurchases: user.totalPurchases,
        phoneNumber: user.phoneNumber,

    } : null;
}

export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    const newUser = {
        id: crypto.randomUUID(),
        username: userData.username,
        email: userData.email,
        passwordHash: userData.passwordHash,
        role: userData.role || 'user',
        totalPurchases: 0, 
        phoneNumber: userData.phoneNumber
    }

    await db.insert(users).values(newUser);
    return {
        ...newUser,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
}

export const resetPassword = async (email: string, newPasswordHash: string): Promise<User | null> => {
    const user = await getUserByEmail(email);
    if (!user) return null;

    const updatedUser: User = {
        ...user,
        passwordHash: newPasswordHash,
        updatedAt: new Date(),
    };

    await db.update(users)
        .set({
            passwordHash: updatedUser.passwordHash,
            updatedAt: new Date().toISOString(),
        })
        .where(eq(users.id, email));

    return updatedUser;
}

export const changeUsername = async (username: string, newUsername: string): Promise<User | null> => {
    const user = await getUserByUsername(username);
    if (!user) return null;

    const updatedUser: User = {
        ...user,
        username: newUsername,
        updatedAt: new Date(),
    };

    await db.update(users)
        .set({
            username: updatedUser.username,
            updatedAt: updatedUser.updatedAt.toISOString(),
        })
        .where(eq(users.id, user.id));

    return updatedUser;
}

export const updateUser = async (id: string, userData: Partial<User>): Promise<User | null> => {
    const user = await getUserById(id);
    if (!user) return null;

    const updatedUser: User = {
        ...user,
        ...userData,
        updatedAt: new Date(),
    };

    await db.update(users)
        .set({
            username: updatedUser.username,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
            role: updatedUser.role,
            totalPurchases: updatedUser.totalPurchases,
            updatedAt: updatedUser.updatedAt.toISOString(),
        })
        .where(eq(users.id, id));

    return updatedUser;
}

export const deleteUser = async (id: string): Promise<void> => {
    await db.delete(users).where(eq(users.id, id));
}

export const updateEmail = async (id: string, newEmail: string): Promise<User | null> => {
    const user = await getUserById(id);
    if (!user) return null;

    const updatedUser: User = {
        ...user,
        email: newEmail,
        updatedAt: new Date(),
    };

    await db.update(users)
        .set({
            email: updatedUser.email,
            updatedAt: updatedUser.updatedAt.toISOString(),
        })
        .where(eq(users.id, id));

    return updatedUser;
}

export const updateUsername = async (id: string, newUsername: string): Promise<User | null> => {
    const user = await getUserById(id);
    if (!user) return null;

    const updatedUser: User = {
        ...user,
        username: newUsername,
        updatedAt: new Date(),
    };

    await db.update(users)
        .set({
            username: updatedUser.username,
            updatedAt: updatedUser.updatedAt.toISOString(),
        })
        .where(eq(users.id, id));

    return updatedUser;
}

export const updatePhoneNumber = async (id: string, newPhoneNumber: string): Promise<User | null> => {
    const user = await getUserById(id);
    if (!user) return null;

    const updatedUser: User = {
        ...user,
        phoneNumber: newPhoneNumber,
        updatedAt: new Date(),
    };

    await db.update(users)
        .set({
            phoneNumber: updatedUser.phoneNumber,
            updatedAt: updatedUser.updatedAt.toISOString(),
        })
        .where(eq(users.id, id));

    return updatedUser;
}


export const changePassword = async (id: string, newPasswordHash: string): Promise<User | null> => {
    const user = await getUserById(id);
    if (!user) return null;

    const updatedUser: User = {
        ...user,
        passwordHash: newPasswordHash,
        updatedAt: new Date(),
    };

    await db.update(users)
        .set({
            passwordHash: updatedUser.passwordHash,
            updatedAt: updatedUser.updatedAt.toISOString(),
        })
        .where(eq(users.id, id));

    return updatedUser;
}