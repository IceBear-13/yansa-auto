import axios from "axios";

const API_URL = import.meta.env.BACKEND_ENDPOINT || 'http://localhost:3000';

export const fetchAllCars = async (): Promise<any[]> => {
    const cars = await axios.get(`${API_URL}/api/cars/all`)
    return cars.data;
}

export const fetchCarByFeatures = async (manufacturer: string | null, model: string | null, fromYear: number | null, toYear: number | null, fromPrice: number | null, toPrice: number | null): Promise<any[]> => {
    const cars = await axios.post(
        `${API_URL}/api/cars/features`,
        {
            data: {
                manufacturer: manufacturer,
                model: model,
                fromYear: fromYear,
                toYear: toYear,
                fromPrice: fromPrice,
                toPrice: toPrice
            }
        }
    )
    return cars.data;
}

export const fetchFeaturedCars = async (): Promise<any[]> => {
    const cars = await axios.get(`${API_URL}/api/cars/featured`)
    return cars.data;
}
