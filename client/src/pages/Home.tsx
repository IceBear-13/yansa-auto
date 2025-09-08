import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import FeaturedVehicles from "../components/Home/FeaturedVehicle";
import { fetchFeaturedCars } from "../api/carApi";

const Home = () => {
    const [query, setQuery] = useState("");
    const [cars, setCars] = useState<any[]>(JSON.parse(localStorage.getItem("featuredCars") || "[]"));

    useEffect(() => {

        const fetchData = async () => {
            const cars = await fetchFeaturedCars();
            setCars(cars);
            localStorage.setItem("featuredCars", JSON.stringify(cars));
        };

        if(!localStorage.getItem("featuredCars")){
            fetchData();
        }
        
    }, []);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-ID", {
            style: "currency",
            currency: "IDR",
        }).format(price);
    };

    const displayedCars = query
        ? cars.filter((car) => {
              const q = query.toLowerCase();
              return (
                  String(car.make || "").toLowerCase().includes(q) ||
                  String(car.model || "").toLowerCase().includes(q) ||
                  String(car.title || "").toLowerCase().includes(q) ||
                  String(car.description || "").toLowerCase().includes(q)
              );
          })
        : cars;

    return (
        <MainLayout>
            <section
                className="relative flex min-h-[60vh] items-center justify-center bg-cover bg-center py-20 text-white"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://images.hgmsites.net/lrg/2015-mercedes-benz-c-class_100474443_l.jpg")'
                }}
            >
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
                        Find Your Perfect Ride
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
                        Explore our extensive collection of new and used vehicles. Drive your dream car today.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <div className="relative w-full max-w-2xl">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </span>
                            <input
                                className="form-input w-full rounded-full border-transparent bg-white/90 py-4 pl-12 pr-32 text-base text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                                placeholder="Search by make, model, or keyword"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                aria-label="Search vehicles"
                            />
                            <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-6 py-2.5 text-white font-semibold shadow-md transition-colors hover:bg-blue-700"
                                onClick={() => {
                                    /* optional: trigger search action; currently filtering is live */
                                }}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900">Featured Vehicles</h2>
                    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {displayedCars.map((car: any) => (
                            <FeaturedVehicles
                                key={car.id}
                                image={car.image}
                                title={car.model}
                                description={car.description}
                                price={formatPrice(car.price)}
                                car={{ make: car.make, model: car.model, year: car.year, id: car.id }}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Home;
