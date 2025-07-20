export interface User {
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
    role: 'user' | 'admin';
    totalPurchases: number;
}