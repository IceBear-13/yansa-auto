export interface inquiry {
    name: string;
    phoneNumber: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    settled: boolean;
    settledAt?: Date;
}