export interface inquiry {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    settled: boolean;
    settledAt?: Date;
}