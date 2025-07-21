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
    
}

export const carControllerInstance = new carController();