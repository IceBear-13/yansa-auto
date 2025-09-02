import { fetchAllCars } from "../api/carApi";
import FeaturedVehicles from "../components/Home/FeaturedVehicle";
import MainLayout from "../layout/MainLayout";
import { useState } from "react";

function Cars() {


  onload = async () => {
    if(!localStorage.getItem("cars")){
      const cars = await fetchAllCars();
      localStorage.setItem("cars", JSON.stringify(cars));
    }
  }

  const [showedCars, setShowedCars] = useState<any[]>(JSON.parse(localStorage.getItem("cars") || "[]"));


  const searchCars = (query: string) => {
    const cars = JSON.parse(localStorage.getItem("cars") || "[]");
    return cars.filter((car: any) =>
      car.make.toLowerCase().includes(query.toLowerCase()) ||
      car.model.toLowerCase().includes(query.toLowerCase()) ||
      car.year.toString().includes(query)
    );
  };

  const handleSearch = (query: string) => {
    const results = searchCars(query);
    setShowedCars(results);
  };

  return (
    <MainLayout>
      <section>
        <div className="mx-auto p-10 bg-gray-50">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Explore Our Inventory
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Find your next dream car from our curated collection.
            </p>
          </div>
          <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="make"
                >
                  Make
                </label>
                <input
                  className="mt-1 block w-full rounded-md border-gray-200 py-2 pl-2 text-base focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm border hover:border-gray-300 transition duration-300"
                  id="make"
                  name="make"
                  type="text"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="model"
                >
                  Model
                </label>
                <input
                  className="mt-1 block w-full rounded-md border border-gray-200 py-2 pl-2 pr-10 text-base focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm hover:border-gray-300 transition duration-300"
                  id="model"
                  name="model"
                  type="text"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="price"
                >
                  Price Range
                </label>
                  <div className="mt-1 flex gap-2">
                  <input
                    className="flex-1 rounded-md border border-gray-200 py-2 pl-2 text-base focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm hover:border-gray-300 transition duration-300 max-w-[50%]"
                    id="price-from"
                    name="priceFrom"
                    type="text"
                    placeholder="From"
                  />
                  <input
                    className="flex-1 rounded-md border border-gray-200 py-2 pl-2 text-base focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm hover:border-gray-300 transition duration-300 max-w-[50%]"
                    id="price-to"
                    name="priceTo"
                    type="text"
                    placeholder="To"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="year-from"
                >
                  Year Range
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    className="flex-1 rounded-md border border-gray-200 py-2 pl-2 text-base focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm hover:border-gray-300 transition duration-300"
                    id="year-from"
                    name="yearFrom"
                    type="number"
                    placeholder="From"
                    min={1900}
                    max={new Date().getFullYear()}
                  />
                  <input
                    className="flex-1 rounded-md border border-gray-200 py-2 pl-2 text-base focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm hover:border-gray-300 transition duration-300"
                    id="year-to"
                    name="yearTo"
                    type="number"
                    placeholder="To"
                    min={1900}
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing 6 results</p>
            <div className="flex items-center gap-2">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="sort-by"
              >
                Sort by:
              </label>
              <select
                className="rounded-md border-gray-300 text-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                id="sort-by"
                name="sort-by"
              >
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Year: Newest First</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-16 p-10">
        {showedCars.map((car) => (
          <FeaturedVehicles
            key={car.id}
            image={car.image}
            title={car.title}
            description={car.description}
            price={car.price}
            car={{
              make: car.make,
              model: car.model,
              year: car.year,
              id: car.registrationNumber
            }}
          />
        ))}
      </section>
    </MainLayout>
  );
}

export default Cars;
