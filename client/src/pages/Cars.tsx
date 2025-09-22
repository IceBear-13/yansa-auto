import { fetchAllCars } from "../api/carApi";
import FeaturedVehicles from "../components/Home/FeaturedVehicle";
import VehicleSkeleton from "../components/VehicleSkeleton";
import MainLayout from "../layout/MainLayout";
import React, { useState, useEffect } from "react";

function Cars() {

  const [showedCars, setShowedCars] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  

  const sortByPriceAsc = () => {
    const sortedCars = [...showedCars].sort((a, b) => a.price - b.price);
    setShowedCars(sortedCars);
  };

  const sortByPriceDesc = () => {
    const sortedCars = [...showedCars].sort((a, b) => b.price - a.price);
    setShowedCars(sortedCars);
  };

  const sortByYearDesc = () => {
    const sortedCars = [...showedCars].sort((a, b) => b.year - a.year);
    setShowedCars(sortedCars);
  };
  
  useEffect(() => {
    const loadCars = async () => {
      setIsLoading(true);
      const cars = await fetchAllCars();
      localStorage.setItem("cars", JSON.stringify(cars));
      const storedCars = JSON.parse(localStorage.getItem("cars") || "[]");
      const sortedCars = [...storedCars].sort((a, b) => a.price - b.price);
      setShowedCars(sortedCars);
      setIsLoading(false);
    };
    loadCars();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const handleSearch = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if(event) event.preventDefault();
    const makeValue = make.toLowerCase();
    const modelValue = model.toLowerCase();
    const priceFromValue = parseInt(priceFrom) || 0;
    const priceToValue = parseInt(priceTo) || Infinity;
    const yearFromValue = parseInt(yearFrom) || 1900;
    const yearToValue = parseInt(yearTo) || new Date().getFullYear();

    const filteredCars = JSON.parse(localStorage.getItem("cars") || "[]").filter((car: any) => {
      return (
        car.manufacturer.toLowerCase().includes(makeValue) &&
        car.model.toLowerCase().includes(modelValue) &&
        car.price >= priceFromValue &&
        car.price <= priceToValue &&
        car.year >= yearFromValue &&
        car.year <= yearToValue
      );
    });
    setShowedCars(filteredCars);
  }

  const shortenDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength) + "...";
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
          <form className="mb-8 rounded-lg bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make</label>
                <input
                  id="make"
                  name="make"
                  type="text"
                  value={make}
                  onChange={e => setMake(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-200 py-2 pl-2 text-base focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm border hover:border-gray-300 transition duration-300"
                />
              </div>
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
                <input
                  id="model"
                  name="model"
                  type="text"
                  value={model}
                  onChange={e => setModel(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-200 py-2 pl-2 pr-10 text-base focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm hover:border-gray-300 transition duration-300"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price Range</label>
                <div className="mt-1 flex gap-2">
                  <input
                    id="price-from"
                    name="priceFrom"
                    type="text"
                    placeholder="From"
                    value={priceFrom}
                    onChange={e => setPriceFrom(e.target.value)}
                    className="flex-1 rounded-md border border-gray-200 py-2 pl-2 text-base focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm hover:border-gray-300 transition duration-300 max-w-[50%]"
                  />
                  <input
                    id="price-to"
                    name="priceTo"
                    type="text"
                    placeholder="To"
                    value={priceTo}
                    onChange={e => setPriceTo(e.target.value)}
                    className="flex-1 rounded-md border border-gray-200 py-2 pl-2 text-base focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm hover:border-gray-300 transition duration-300 max-w-[50%]"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="year-from" className="block text-sm font-medium text-gray-700">Year Range</label>
                <div className="mt-1 flex gap-2">
                  <input
                    id="year-from"
                    name="yearFrom"
                    type="number"
                    placeholder="From"
                    min={1900}
                    max={new Date().getFullYear()}
                    value={yearFrom}
                    onChange={e => setYearFrom(e.target.value)}
                    className="flex-1 rounded-md border border-gray-200 py-2 pl-2 text-base focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm hover:border-gray-300 transition duration-300"
                  />
                  <input
                    id="year-to"
                    name="yearTo"
                    type="number"
                    placeholder="To"
                    min={1900}
                    max={new Date().getFullYear()}
                    value={yearTo}
                    onChange={e => setYearTo(e.target.value)}
                    className="flex-1 rounded-md border border-gray-200 py-2 pl-2 text-base focus:border-[var(--primary-color)] focus:outline-none focus:ring-[var(--primary-color)] sm:text-sm hover:border-gray-300 transition duration-300"
                  />
                </div>
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-md py-2 bg-blue-600 text-white transition duration-300 hover:bg-blue-700"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </form>
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
                defaultValue="price-asc"
                onChange={(e) => {
                  if(e.target.value === "price-asc") sortByPriceAsc();
                  else if(e.target.value === "price-desc") sortByPriceDesc();
                  else if(e.target.value === "year-desc") sortByYearDesc();
                }}
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year-desc">Year: Newest First</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-16 p-10">
        {isLoading ? (
          // Show multiple skeletons while loading
          Array.from({ length: 6 }).map((_, index) => (
            <VehicleSkeleton key={index} />
          ))
        ) : (
          showedCars.map((car) => (
            <FeaturedVehicles
              key={car.id}
              image={car.images[0]}
              title={car.manufacturer + " " + car.model}
              description={shortenDescription(car.description, 100)}
              price={formatPrice(car.price)}
              car={{
                make: car.make,
                model: car.model,
                year: car.year,
                id: car.registrationNumber
              }}
            />
          ))
        )}
      </section>
    </MainLayout>
  );
}

export default Cars;
