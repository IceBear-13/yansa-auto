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

export const fetchCarByRegisterNumber = async (regNumber: string): Promise<any> => {
    const car = await axios.get(`${API_URL}/api/cars/registration/${regNumber}`);
    return car.data;
}


export const addNewCar = async (formData: FormData) => {
  const token = localStorage.getItem("token");
  
  const response = await fetch("http://localhost:3000/api/cars/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to add car");
  }

  return response.json();
};

export const deleteCarByRegistrationNumber = async (regNumber: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`http://localhost:3000/api/cars/delete/${regNumber}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to delete car");
  }

  return response;
};