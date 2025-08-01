import * as cars from "../db/operations/cars-operations";
import { Car } from "../models/cars";
import { uploadCarImage } from "../storage/storage-operations";

export class CarsService {
    async getAllCars(): Promise<Car[]> {
        try{
            return await cars.getAllCars();
        } catch (error) {
            throw new Error(`Failed to get all cars: ${error}`);
        }
    }

    async getCarsByModel(model: string): Promise<Car[]> {
        try {
            return await cars.getCarByModel(model);
        } catch (error) {
            throw new Error(`Failed to get cars by model: ${error}`);
        }
    }

    async getCarsByManufacturer(manufacturer: string): Promise<Car[]> {
        try {
            return await cars.getCarByManufacturer(manufacturer);
        } catch (error) {
            throw new Error(`Failed to get cars by manufacturer: ${error}`);
        }
    }
    
    async getCarsByManufacturerAndModel(manufacturer: string, model: string): Promise<Car[]> {
        try {
            return await cars.getCarByManufacturerAndModel(manufacturer, model);
        } catch (error) {
            throw new Error(`Failed to get cars by manufacturer and model: ${error}`);
        }
    }

    async getCarsByMileageRange(minMileage: number, maxMileage: number): Promise<Car[]> {
        try {
            return await cars.getCarsByMileageRange(minMileage, maxMileage);
        } catch (error) {
            throw new Error(`Failed to get cars by mileage range: ${error}`);
        }
    }

    async getCarByModelAndYear(model: string, year: number): Promise<Car[]> {
        try {
            return await cars.getCarByModelAndYear(model, year);
        } catch (error) {
            throw new Error(`Failed to get car by model and year: ${error}`);
        }
    }

    async getCarByMileage(mileage: number): Promise<Car[]> {
        try {
            return await cars.getCarByMileage(mileage);
        } catch (error) {
            throw new Error(`Failed to get car by mileage: ${error}`);
        }
    }

    async getCarByRegistrationNumber(registrationNumber: string): Promise<Car | null> {
        try {
            return await cars.getCarByRegistrationNumber(registrationNumber);
        } catch (error) {
            throw new Error(`Failed to get car by registration number: ${error}`);
        }
    }

    async createCar(car: Car, image: Express.Multer.File): Promise<Car> {
        try{
            await uploadCarImage(image, car.registrationNumber);
            return await cars.createCar(car);
        } catch (error) {
            throw new Error(`Failed to create car: ${error}`);
        }
    }
}

export const carsService = new CarsService();