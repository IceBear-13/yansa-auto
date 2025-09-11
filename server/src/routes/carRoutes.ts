import { Router } from "express";
import { carControllerInstance } from "../controller/carController";
import multer from "multer";
import { authMiddleware } from "../middleware/authMiddleware";

export const carRouter = Router();

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

carRouter.get('/all', carControllerInstance.getCars.bind(carControllerInstance));
carRouter.get('/model/:model', carControllerInstance.getCarsByModel.bind(carControllerInstance));
carRouter.get('/manufacturer/:manufacturer', carControllerInstance.getCarsByManufacturer.bind(carControllerInstance));
carRouter.get('/manufacturer/model', carControllerInstance.getCarsByManufacturerAndModel.bind(carControllerInstance));
carRouter.get('/mileage-range', carControllerInstance.getCarsByMileageRange.bind(carControllerInstance));
carRouter.get('/model/:model/year/:year', carControllerInstance.getCarByModelAndYear.bind(carControllerInstance));
carRouter.get('/mileage/:mileage', carControllerInstance.getCarsByMileageRange.bind(carControllerInstance));
carRouter.post('/features', carControllerInstance.getCarByFeatures.bind(carControllerInstance));
carRouter.post('/create', authMiddleware, upload.single('images'), carControllerInstance.createCar.bind(carControllerInstance));
carRouter.get('/featured', carControllerInstance.getFeaturedCars.bind(carControllerInstance));
carRouter.get('/registration/:registrationNumber', carControllerInstance.getCarByRegistrationNumber.bind(carControllerInstance));
carRouter.delete('/delete/:registrationNumber', authMiddleware, carControllerInstance.deleteCar.bind(carControllerInstance));
carRouter.put('/update/:registrationNumber', authMiddleware, carControllerInstance.updateCar.bind(carControllerInstance));