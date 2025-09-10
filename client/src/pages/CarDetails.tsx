import { fetchCarByRegisterNumber } from "../api/carApi";
import MainLayout from "../layout/MainLayout";
import { useEffect, useState } from "react";

function CarDetails() {
  const [car, setCar] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const carId = window.location.pathname.split("/").pop();

  console.log(carId);

  useEffect(() => {
    const loadCar = async () => {
      setIsLoading(true);
      if (carId) {
        const carData = await fetchCarByRegisterNumber(carId);
        setCar(carData);
        console.log(carData);
      }
      setIsLoading(false);
    };
    loadCar();
  }, [carId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-ID", {
        style: "currency",
        currency: "IDR",
    }).format(price);
  };

  const formatNumberWithCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Fix: Add fallback for undefined images
  const images = car?.car?.images ? [...car.car.images] : [];

  const CarDetailsSkeleton = () => (
    <div className="w-full px-10 mb-20 mt-10 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 flex items-center">
        <div className="h-4 w-12 bg-gray-300 rounded"></div>
        <span className="mx-2 text-gray-300">/</span>
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
      </div>
      
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        {/* Image section skeleton */}
        <div className="lg:col-span-3">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <div className="bg-gray-300 aspect-[4/3]"></div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="size-2 rounded-full bg-gray-400"
                ></div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-md"
              >
                <div className="h-20 w-full bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Details section skeleton */}
        <div className="lg:col-span-2">
          <div className="h-10 w-3/4 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
          </div>
          
          <div className="mt-8">
            <div className="h-8 w-40 bg-gray-300 rounded mb-4"></div>
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-gray-200 pt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <div className="h-3 w-16 bg-gray-300 rounded mb-1"></div>
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-10">
            <div className="h-8 w-24 bg-gray-300 rounded mb-2"></div>
            <div className="h-9 w-48 bg-gray-300 rounded mb-6"></div>
            <div className="flex gap-4">
              <div className="flex-1 h-12 bg-gray-300 rounded-lg"></div>
              <div className="flex-1 h-12 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <MainLayout>
        <CarDetailsSkeleton />
      </MainLayout>
    );
  }

  if (!car) {
    return (
      <MainLayout>
        <div className="w-full px-10 mb-20 mt-10 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Car not found</h1>
          <p className="mt-2 text-gray-600">The car you're looking for doesn't exist.</p>
        </div>
      </MainLayout>
    );
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
                  <p className="font-medium text-gray-800">{formatNumberWithCommas(car.car.mileage)} KM</p>
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