export interface User {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    createdAt: string;
    updatedAt: string;
    role: 'user' | 'admin';
    totalPurchases: number;
}