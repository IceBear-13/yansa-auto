import { fetchAllCars } from "../api/carApi";
import FeaturedVehicles from "../components/Home/FeaturedVehicle";
import MainLayout from "../layout/MainLayout";
import { useState, useEffect } from "react";

function Cars() {

  const [showedCars, setShowedCars] = useState<any[]>(JSON.parse(localStorage.getItem("cars") || "[]"));
  

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

      const cars = await fetchAllCars();
      localStorage.setItem("cars", JSON.stringify(cars));
      const storedCars = JSON.parse(localStorage.getItem("cars") || "[]");
      const sortedCars = [...storedCars].sort((a, b) => a.price - b.price);
      setShowedCars(sortedCars);
    };
    loadCars();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const handleSearch = () => {
    const make = (document.getElementById("make") as HTMLInputElement).value.toLowerCase() || "";
    const model = (document.getElementById("model") as HTMLInputElement).value.toLowerCase() || "";
    const priceFrom = parseInt((document.getElementById("price-from") as HTMLInputElement).value) || 0;
    const priceTo = parseInt((document.getElementById("price-to") as HTMLInputElement).value) || Infinity;
    const yearFrom = parseInt((document.getElementById("year-from") as HTMLInputElement).value) || 1900;
    const yearTo = parseInt((document.getElementById("year-to") as HTMLInputElement).value) || new Date().getFullYear();

    console.log(make, model, priceFrom, priceTo, yearFrom, yearTo);

    const filteredCars = JSON.parse(localStorage.getItem("cars") || "[]").filter((car: any) => {
      return (
        car.manufacturer.toLowerCase().includes(make) &&
        car.model.toLowerCase().includes(model) &&
        car.price >= priceFrom &&
        car.price <= priceTo &&
        car.year >= yearFrom &&
        car.year <= yearTo
      );
    });
    setShowedCars(filteredCars);
  }

  console.log(Cars);

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
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 lg:grid-cols-4">
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
              <button type="submit" className="mt-4 w-full rounded-md py-2 bg-blue-600 text-white transition duration-300 hover:bg-blue-700" onClick={handleSearch}>Search</button>
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
        {showedCars.map((car) => (
          <FeaturedVehicles
            key={car.id}
            image={car.images[0]}
            title={car.model}
            description={car.description}
            price={formatPrice(car.price)}
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
