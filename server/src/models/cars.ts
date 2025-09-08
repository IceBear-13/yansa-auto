export interface Car {
    registrationNumber: string;
    manufacturer: string;
    model: string;
    year: number;
    color: string;
    mileage: number;
    price: number;
    fuelType: string;
    description: string;
    transmission: 'manual' | 'automatic';
    createdAt: Date;
    updatedAt: Date;
    featured: boolean;
}