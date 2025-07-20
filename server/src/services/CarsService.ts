import * as cars from "../db/operations/cars-operations";
import { Car } from "../models/cars";

export class CarsService {
    async getAllCars(): Promise<Car[]> {
        return cars.getAllCars();
    }

    async getCarsByModel(model: string): Promise<Car[]> {
        return cars.getCarByModel(model);
    }

    async getCarsByManufacturer(manufacturer: string): Promise<Car[]> {
        return cars.getCarByManufacturer(manufacturer);
    }
    
    async getCarsByManufacturerAndModel(manufacturer: string, model: string): Promise<Car[]> {
        return cars.getCarByManufacturerAndModel(manufacturer, model);
    }

    async getCarsByMileageRange(minMileage: number, maxMileage: number): Promise<Car[]> {
        return cars.getCarsByMileageRange(minMileage, maxMileage);
    }

    async getCarByModelAndYear(model: string, year: number): Promise<Car[]> {
        return cars.getCarByModelAndYear(model, year);
    }

    async getCarByMileage(mileage: number): Promise<Car[]> {
        return cars.getCarByMileage(mileage);
    }

    async getCarByRegistrationNumber(registrationNumber: string): Promise<Car | null> {
        return cars.getCarByRegistrationNumber(registrationNumber);
    }

    async createCar(car: Car, image: Express.Multer.File): Promise<Car> {
        return cars.createCar(car, image);
    }

}

export const carsService = new CarsService();