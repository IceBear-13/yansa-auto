import { db } from "../db";
import { Car } from "../../models/cars";
import { cars } from "../schema/cars";
import { and, eq, gte, lte } from "drizzle-orm";
import { supabase } from "../../storage/storage";
import { uploadCarImage } from "../../storage/storage-operations";

export const getAllCars = async (): Promise<Car[]> => {
  return await db.select()
    .from(cars)
    .then(rows => rows.map(car => ({
      registrationNumber: car.registrationNumber,
      manufacturer: car.manufacturer,
      model: car.model,
      year: car.year,
      price: car.price,
      createdAt: new Date(car.createdAt),
      updatedAt: new Date(car.createdAt),
      description: car.description,
      mileage: car.mileage,
      color: car.color,
      transmission: car.transmission as 'manual' | 'automatic',
      fuelType: car.fuelType
    })));

};

export const getCarByRegistrationNumber = async (registrationNumber: string): Promise<Car | null> => {
  const car = await db.select()
    .from(cars)
    .where(eq(cars.registrationNumber, registrationNumber))
    .then(rows => rows[0]);

  if (!car) return null;

  return {
    registrationNumber: car.registrationNumber,
    manufacturer: car.manufacturer,
    model: car.model,
    year: car.year,
    price: car.price,
    createdAt: new Date(car.createdAt),
    updatedAt: new Date(car.updatedAt),
    description: car.description,
    mileage: car.mileage,
    color: car.color,
    transmission: car.transmission as 'manual' | 'automatic',
    fuelType: car.fuelType
  };
};

export const getCarByManufacturer = async (manufacturer: string): Promise<Car[]> => {
  return await db.select()
    .from(cars)
    .where(eq(cars.manufacturer, manufacturer))
    .then(rows => rows.map(car => ({
      registrationNumber: car.registrationNumber,
      manufacturer: car.manufacturer,
      model: car.model,
      year: car.year,
      price: car.price,
      createdAt: new Date(car.createdAt),
      updatedAt: new Date(car.updatedAt),
      description: car.description,
      mileage: car.mileage,
      color: car.color,
      transmission: car.transmission as 'manual' | 'automatic',
      fuelType: car.fuelType
    })));
};

export const getCarByManufacturerAndModel = async (manufacturer: string, model: string): Promise<Car[]> => {
  return await db.select()
    .from(cars)
    .where(and(eq(cars.manufacturer, manufacturer), eq(cars.model, model)))
    .then(rows => rows.map(car => ({
      registrationNumber: car.registrationNumber,
      manufacturer: car.manufacturer,
      model: car.model,
      year: car.year,
      price: car.price,
      createdAt: new Date(car.createdAt),
      updatedAt: new Date(car.updatedAt),
      description: car.description,
      mileage: car.mileage,
      color: car.color,
      transmission: car.transmission as 'manual' | 'automatic',
      fuelType: car.fuelType
    })));
};

export const getCarByModel = async (model: string): Promise<Car[]> => {
  return await db.select()
    .from(cars)
    .where(eq(cars.model, model))
    .then(rows => rows.map(car => ({
      registrationNumber: car.registrationNumber,
      manufacturer: car.manufacturer,
      model: car.model,
      year: car.year,
      price: car.price,
      createdAt: new Date(car.createdAt),
      updatedAt: new Date(car.updatedAt),
      description: car.description,
      mileage: car.mileage,
      color: car.color,
      transmission: car.transmission as 'manual' | 'automatic',
      fuelType: car.fuelType
    })));
};

export const getCarByModelAndYear = async (model: string, year: number): Promise<Car[]> => {
  return await db.select()
    .from(cars)
    .where(and(eq(cars.model, model), eq(cars.year, year)))
    .then(rows => rows.map(car => ({
      registrationNumber: car.registrationNumber,
      manufacturer: car.manufacturer,
      model: car.model,
      year: car.year,
      price: car.price,
      createdAt: new Date(car.createdAt),
      updatedAt: new Date(car.updatedAt),
      description: car.description,
      mileage: car.mileage,
      color: car.color,
      transmission: car.transmission as 'manual' | 'automatic',
      fuelType: car.fuelType
    })));
};

export const getCarByMileage = async (mileage: number): Promise<Car[]> => {
  return await db.select()
    .from(cars)
    .where(eq(cars.mileage, mileage))
    .then(rows => rows.map(car => ({
      registrationNumber: car.registrationNumber,
      manufacturer: car.manufacturer,
      model: car.model,
      year: car.year,
      price: car.price,
      createdAt: new Date(car.createdAt),
      updatedAt: new Date(car.updatedAt),
      description: car.description,
      mileage: car.mileage,
      color: car.color,
      transmission: car.transmission as 'manual' | 'automatic',
      fuelType: car.fuelType
    })));
};

export const getCarsByMileageRange = async (minMileage: number, maxMileage: number): Promise<Car[]> => {
  return await db.select()
    .from(cars)
    .where(and(
      gte(cars.mileage, minMileage),
      lte(cars.mileage, maxMileage)
    )).then(rows => rows.map(car => ({
      registrationNumber: car.registrationNumber,
      manufacturer: car.manufacturer,
      model: car.model,
      year: car.year,
      price: car.price,
      createdAt: new Date(car.createdAt),
      updatedAt: new Date(car.updatedAt),
      description: car.description,
      mileage: car.mileage,
      color: car.color,
      transmission: car.transmission as 'manual' | 'automatic',
      fuelType: car.fuelType
    })));
}

export const createCar = async (car: Car, image: Express.Multer.File): Promise<Car> => {
  const newCar = {
    ...car,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString()
  }
  await db.insert(cars).values(newCar);
  await uploadCarImage(image, car.registrationNumber)
  return {
    ...newCar,
    createdAt: new Date(newCar.createdAt),
    updatedAt: new Date(newCar.updatedAt)
  }
}
