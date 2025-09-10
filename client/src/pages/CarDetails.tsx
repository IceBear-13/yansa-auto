import { fetchCarByRegisterNumber } from "../api/carApi";
import MainLayout from "../layout/MainLayout";
import { useEffect, useState } from "react";

function CarDetails() {
  const [car, setCar] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const carId = window.location.pathname.split("/").pop();

  console.log(carId);

  useEffect(() => {
    const loadCar = async () => {
      if (carId) {
        const carData = await fetchCarByRegisterNumber(carId);
        setCar(carData);
        console.log(carData);
      }
    };
    loadCar();
  }, [carId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-ID", {
        style: "currency",
        currency: "IDR",
    }).format(price);
  };

  // Fix: Add fallback for undefined images
  const images = car?.car?.images ? [...car.car.images] : [];

  if (!car) {
    return <div>Loading...</div>;
  }


  return (
    <MainLayout>
      <div className="w-full px-10 mb-20 mt-10">
        <div className="mb-6 text-sm text-gray-500">
          <a className="hover:text-blue-600" href="/cars">
            Cars
          </a>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-800">{car.car.manufacturer} {car.car.model}</span>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <div className="bg-cover bg-center aspect-[4/3]">
                <img
                  src={images[selectedIndex]}
                  alt="Car Image"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.slice(0, 5).map((_, idx) => (
                  <button
                    key={idx}
                    className={
                      selectedIndex === idx
                        ? "size-2 rounded-full bg-white shadow-sm"
                        : "size-2 rounded-full bg-white/60 shadow-sm"
                    }
                    onClick={() => setSelectedIndex(idx)}
                    aria-label={`Select image ${idx + 1}`}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-4">
              {images.map((src, i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-md ${
                    selectedIndex === i ? "border-2 border-blue-500" : ""
                  }`}
                >
                  <img
                    alt={`Thumbnail ${i + 1}`}
                    className={`h-full w-full object-cover ${
                      selectedIndex === i
                        ? ""
                        : "opacity-70 hover:opacity-100 transition"
                    }`}
                    src={src}
                    onClick={() => setSelectedIndex(i)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {car.car.model}
            </h1>
            <p className="mt-4 text-gray-600">
              {car.car.description}
            </p>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                Specifications
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-gray-200 pt-4">
                <div>
                  <p className="text-sm text-gray-500">Year</p>
                  <p className="font-medium text-gray-800">{car.car.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fuel Economy</p>
                  <p className="font-medium text-gray-800">{car.car.fuelType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Color</p>
                  <p className="font-medium text-gray-800">{car.car.color}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mileage</p>
                  <p className="font-medium text-gray-800">{car.car.mileage} KM</p>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-gray-900">Pricing</h2>
              <p className="mt-2 text-3xl font-bold text-blue-600 ">
                {formatPrice(car.car.price)}
              </p>
              <div className="mt-6 flex gap-4">
                <button className="flex flex-1 items-center justify-center rounded-lg hover:bg-white hover:text-blue-700 px-6 py-3 text-base font-bold text-white shadow-md bg-blue-700 transition-all">
                  <span>Inquire Now</span>
                </button>
                <button className="flex flex-1 items-center justify-center rounded-lg bg-gray-200 px-6 py-3 text-base font-bold text-gray-800 shadow-md hover:bg-gray-300 transition-all">
                  <span>Book a Test Drive</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}

export default CarDetails;