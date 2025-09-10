export interface inquiry {
    id: string;
    name: string;
    phoneNumber?: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    settled: boolean;
    settledAt?: Date;
}