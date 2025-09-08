import { carsService } from '../services/CarsService';
import { AuthRequest } from '../models/requests/AuthRequest';
import { Request, Response } from 'express';
import { Car } from '../models/cars';

export class carController {

    async getCars(req: Request, res: Response) {
        try {
            const cars = await carsService.getAllCars();
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
            const image = req.file;

            if(!car) {
                res.status(400).json({ message: 'Car data is required' });
                return;
            }

            if(!image) {
                res.status(400).json({ message: 'Car image is required' });
                return;
            }

            carsService.createCar(car, image);
            res.status(201).json({ message: 'Car created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error creating car', error });
        }
    }

    async getCarByRegistrationNumber(req: AuthRequest, res: Response) {
        const registrationNumber = req.params.registrationNumber;

        try {
            const car = await carsService.getCarByRegistrationNumber(registrationNumber);
            if (car) {
                res.status(200).json(car);
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
            res.status(200).json(cars);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving featured cars', error });
        }
    }
}
export const carControllerInstance = new carController();