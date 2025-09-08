import { db } from "../db";
import { Car } from "../../models/cars";
import { cars } from "../schema/cars";
import { and, eq, gte, like, lte } from "drizzle-orm";

export const getAllCars = async (): Promise<Partial<Car>[]> => {
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

export const getFeaturedCars = async (): Promise<Partial<Car>[]> => {
  return await db.select()
    .from(cars)
    .where(eq(cars.featured, true))
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

export const getCarByRegistrationNumber = async (registrationNumber: string): Promise<Partial<Car> | null> => {
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

export const getCarByFeatures = async (manufacturer: string | null, model: string | null, fromYear: number | null, toYear: number | null, fromPrice: number | null, toPrice: number | null): Promise<Partial<Car>[]> => {
  const manufacturerPattern = manufacturer ? `%${manufacturer}%` : '%';
  const modelPattern = model ? `%${model}%` : '%';
  const minYear = Number.isFinite(fromYear as number) ? (fromYear as number) : 0;
  const maxYear = Number.isFinite(toYear as number) ? (toYear as number) : Number.MAX_SAFE_INTEGER;
  const minPrice = Number.isFinite(fromPrice as number) ? (fromPrice as number) : 0;
  const maxPrice = Number.isFinite(toPrice as number) ? (toPrice as number) : Number.MAX_SAFE_INTEGER;

  const rows = await db.select()
    .from(cars)
    .where(and(
      like(cars.manufacturer, manufacturerPattern),
      like(cars.model, modelPattern),
      gte(cars.year, minYear),
      lte(cars.year, maxYear),
      gte(cars.price, minPrice),
      lte(cars.price, maxPrice)
    ));

  return rows.map(car => ({
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
  }));
};

export const getCarByYearRange = async (fromYear: number, toYear: number): Promise<Partial<Car>[]> => {
  return await db.select()
    .from(cars)
    .where(and(
      gte(cars.year, fromYear),
      lte(cars.year, toYear)
    ))
    .then(
      rows => rows.map(car => ({
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
      }))
    )
}

export const getCarByPriceRange = async (fromPrice: number, toPrice: number): Promise<Partial<Car>[]> => {
  return await db.select()
    .from(cars)
    .where(and(
      gte(cars.price, fromPrice),
      lte(cars.price, toPrice)
    ))
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
    })))
}

export const getCarByManufacturer = async (manufacturer: string): Promise<Partial<Car>[]> => {
  return await db.select()
    .from(cars)
    .where(like(cars.manufacturer, manufacturer))
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

export const getCarByManufacturerAndModel = async (manufacturer: string, model: string): Promise<Partial<Car>[]> => {
  return await db.select()
    .from(cars)
    .where(and(like(cars.manufacturer, manufacturer), like(cars.model, model)))
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

export const getCarByModel = async (model: string): Promise<Partial<Car>[]> => {
  return await db.select()
    .from(cars)
    .where(like(cars.model, model))
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

export const getCarByModelAndYear = async (model: string, year: number): Promise<Partial<Car>[]> => {
  return await db.select()
    .from(cars)
    .where(and(like(cars.model, model), eq(cars.year, year)))
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

export const getCarByMileage = async (mileage: number): Promise<Partial<Car>[]> => {
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

export const getCarsByMileageRange = async (minMileage: number, maxMileage: number): Promise<Partial<Car>[]> => {
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

export const createCar = async (car: Car): Promise<Partial<Car>> => {
  try{
    const newCar = {
      ...car,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    await db.insert(cars).values(newCar);
    return {
      ...newCar,
      createdAt: new Date(newCar.createdAt),
      updatedAt: new Date(newCar.updatedAt)
    };
  } catch (error) {
      console.error(`Failed to create car: ${error}`);
      throw new Error(`Failed to create car: ${error}`);
  }

}

export const updateCar = async (registrationNumber: string, car: Partial<Car>): Promise<Partial<Car> | null> => {
  const existingCar = await getCarByRegistrationNumber(registrationNumber);
  if (!existingCar) {
    return null;
  }

  const updatedCar = {
    ...existingCar,
    ...car,
    updatedAt: new Date()
  };

  await db.update(cars)
    .set({
      manufacturer: updatedCar.manufacturer,
      model: updatedCar.model,
      year: updatedCar.year,
      price: updatedCar.price,
      description: updatedCar.description,
      mileage: updatedCar.mileage,
      color: updatedCar.color,
      transmission: updatedCar.transmission,
      fuelType: updatedCar.fuelType,
      featured: updatedCar.featured,
      updatedAt: updatedCar.updatedAt.toISOString()
    })
    .where(eq(cars.registrationNumber, registrationNumber));

  return updatedCar;
}

export const deleteCar = async (registrationNumber: string): Promise<Partial<Car> | null> => {
  const existingCar = await getCarByRegistrationNumber(registrationNumber);
  if (!existingCar) {
    return null;
  }

  await db.delete(cars)
    .where(eq(cars.registrationNumber, registrationNumber));

  return existingCar;
}