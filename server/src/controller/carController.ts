import { carsService } from '../services/CarsService';
import { AuthRequest } from '../models/requests/AuthRequest';
import { Request, Response } from 'express';
import { Car } from '../models/cars';
import { getCarImages } from '../storage/storage-operations';
import { deleteCar } from '../db/operations/cars-operations';

export class carController {

    async getCars(req: Request, res: Response) {
        try {
            const cars = await carsService.getAllCars();
            for (const car of cars) {
                const images = await getCarImages(car.registrationNumber!);
                (car as any).images = images;
            }
            res.status(200).json(cars);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving cars', error });
            console.error(error)
        }
    }

    async getCarsByModel(req: AuthRequest, res: Response) {
        const model = req.params.model;
        try {
            const cars = await carsService.getCarsByModel(model);
            res.status(200).json(cars);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving cars by model', error });
        }
    }

    async getCarsByManufacturer(req: AuthRequest, res: Response) {
        const manufacturer = req.params.manufacturer;
        try {
            const cars = await carsService.getCarsByManufacturer(manufacturer);
            res.status(200).json(cars);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving cars by manufacturer', error });
        }
    }

    async getCarsByManufacturerAndModel(req: AuthRequest, res: Response) {
        const { manufacturer, model } = req.body;
        try {
            const cars = await carsService.getCarsByManufacturerAndModel(manufacturer, model);
            res.status(200).json(cars);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving cars by manufacturer and model', error });
        }
    }

    async getCarsByMileageRange(req: AuthRequest, res: Response) {
        const { minMileage, maxMileage } = req.body;
        try {
            const cars = await carsService.getCarsByMileageRange(Number(minMileage), Number(maxMileage));
            res.status(200).json(cars);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving cars by mileage range', error });
        }
    }

    async getCarByModelAndYear(req: AuthRequest, res: Response) {
        const { model, year } = req.params;
        try {
            const cars = await carsService.getCarByModelAndYear(model, Number(year));
            res.status(200).json(cars);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving car by model and year', error });
        }
    }

    async createCar(req: AuthRequest, res: Response) {
        const user = req.user;
        if(!user || user.role !== 'admin') {
            console.log(user);
            res.status(403).json({message: 'Forbidden. Only admins can create cars.'});
            return;
        }

        try{
            const car: Car = req.body;
            const images = req.file;

            if(!car) {
                res.status(400).json({ message: 'Car data is required' });
                return;
            }

            await carsService.createCar(car, images!);
            res.status(201).json({ message: 'Car created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error creating car', error });
        }
    }

    async getCarByRegistrationNumber(req: AuthRequest, res: Response) {
        const registrationNumber = req.params.registrationNumber;

        try {
            const car = await carsService.getCarByRegistrationNumber(registrationNumber);
            const images = await getCarImages(registrationNumber);
            (car as any).images = images;
            if (car) {
                res.status(200).json({ car });
            } else {
                res.status(404).json({ message: 'Car not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving car by registration number', error });
        }
    }

    async getCarByFeatures(req: AuthRequest, res: Response) {
        const manufacturer = req.query.manufacturer as string | null;
        const model = req.query.model as string | null;
        const fromYear = req.query.fromYear ? parseInt(req.query.fromYear as string, 10) : null;
        const toYear = req.query.toYear ? parseInt(req.query.toYear as string, 10) : null;
        const fromPrice = req.query.fromPrice ? parseFloat(req.query.fromPrice as string) : null;
        const toPrice = req.query.toPrice ? parseFloat(req.query.toPrice as string) : null;

        try{
            const cars = await carsService.getCarByFeatures(manufacturer, model, fromYear, toYear, fromPrice, toPrice)
            if(cars) {
                res.status(200).json(cars);
            } else {
                res.status(404).json({message: cars});
            }
        } catch (error) {
            console.log(error);
        }

    }

    async getFeaturedCars(req: AuthRequest, res: Response) {
        try {
            const cars = await carsService.getFeaturedCars();
            for (const car of cars) {
                const images = await getCarImages(car.registrationNumber!);
                (car as any).images = images;
            }
            res.status(200).json(cars);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving featured cars', error });
        }
    }

    async deleteCar(req: AuthRequest, res: Response) {
        const user = req.user;
        if(!user || user.role !== 'admin') {
            console.log(user);
            res.status(403).json({message: 'Forbidden. Only admins can delete cars.'});
            return;
        }

        const registrationNumber = req.params.registrationNumber;

        try {
            const car = await carsService.deleteCar(registrationNumber);
            if (car) {
                res.status(200).json({ message: 'Car deleted successfully' });
            } else {
                res.status(404).json({ message: 'Car not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting car', error });
        }
    }

    async updateCar(req: AuthRequest, res: Response) {
        const user = req.user;
        if(!user || user.role !== 'admin') {
            console.log(user);
            res.status(403).json({message: 'Forbidden. Only admins can update cars.'});
            return;
        }

        const registrationNumber = req.params.registrationNumber;
        const updatedFields: Partial<Car> = req.body;

        try {
            const car = await carsService.updateCar(registrationNumber, updatedFields);
            if (car) {
                res.status(200).json({ message: 'Car updated successfully', car });
            } else {
                res.status(404).json({ message: 'Car not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating car', error });
        }
    }
}
export const carControllerInstance = new carController();