import { useEffect, useState } from "react";
import { CarInventory } from "../components/admin/CarInventory";
import MainLayout from "../layout/MainLayout";
import InventorySkeleton from "../components/admin/InventorySkeleton";
import { fetchAllCars } from "../api/carApi";

export default function Inventory() {
  const [cars, setCars] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  }

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        const response = await fetchAllCars();
        setCars(response);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCars();
  }, []);

  // Filter cars based on search query
  const filteredCars = searchQuery
    ? cars.filter((car) => {
        const query = searchQuery.toLowerCase();
        return (
          car.model?.toLowerCase().includes(query) ||
          car.year?.toString().includes(query) ||
          car.price?.toString().includes(query) ||
          car.registrationNumber?.toLowerCase().includes(query)
        );
      })
    : cars;

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex-1 p-10">
          <InventorySkeleton />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex-1 p-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-gray-800 text-3xl font-bold">Vehicle Management</h1>
          <button 
            className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 shadow-sm hover:bg-blue-800 text-white" 
            onClick={() => {window.location.href = '/admin/add-new-car'}}
          >
            <span className="material-symbols-outlined">add</span>
            <span className="text-sm font-semibold">Add New Vehicle</span>
          </button>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              search
            </span>
            <input
              className="form-input w-full rounded-md border-gray-300 py-2 pl-10 pr-4 text-gray-800 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Search vehicles by model, year, price..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-md">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Image
                </th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Model
                </th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Registration Number
                </th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Year
                </th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Price
                </th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCars.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    {searchQuery ? "No vehicles found matching your search." : "No vehicles available."}
                  </td>
                </tr>
              ) : (
                filteredCars.map((car) => (
                  <CarInventory 
                    key={car.registrationNumber}
                    registrationNumber={car.registrationNumber}
                    model={car.model}
                    year={car.year}
                    price={formatPrice(car.price)}
                    imageUrl={car.images[0]}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}