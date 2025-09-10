import MainLayout from "../layout/MainLayout";
import { authenticate } from "../api/authApi";
import { useState, useEffect } from "react";
import RecentActivity from "../components/admin/RecentActivity";
import AdminDashboardSkeleton from "../components/admin/SkeletonLoading";
import { fetchAllCars } from "../api/carApi";
import { fetchAllInquiries } from "../api/inquiries";

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [carCount, setCarCount] = useState(0);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        setIsLoading(true);
        const user = await authenticate();

        if (user.status === 401 || user.user.role !== "admin") {
          setIsAdmin(false);
          setAccessDenied(true);
          setIsLoading(false);
          return;
        }

        setIsAdmin(true);

        const [cars, inquiriesData] = await Promise.all([
          fetchAllCars(),
          fetchAllInquiries()
        ]);
        
        setCarCount(cars.length);
        setInquiries(inquiriesData);
      } catch (error) {
        console.error("Error loading admin data:", error);
        setAccessDenied(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadAdminData();
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <AdminDashboardSkeleton />
      </MainLayout>
    );
  }

  if (accessDenied || !isAdmin) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 p-10">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
            <span className="rounded-full bg-[var(--primary-100)] p-2 text-[var(--primary-600)]">
              <span className="material-symbols-outlined"></span>
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">{carCount}</p>
        </div>
      </section>
      
      <section className="mt-8 p-10">
        <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          <a className="flex min-w-[150px] items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50" href="/admin/add-new-car">
            <span className="material-symbols-outlined">
              <img
                src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
                alt="Add new vehicle"
                className="size-4"
              />
            </span>
            <span>Add new vehicle</span>
          </a>
          <button className="flex min-w-[150px] items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
            <span className="material-symbols-outlined">
              <img
                src="https://static.thenounproject.com/png/2190194-200.png"
                alt="Manage users"
                className="size-4"
              />
            </span>
            <span>Manage Users</span>
          </button>
          <a className="flex min-w-[150px] items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50" href="/admin/inventory">
            <span className="material-symbols-outlined">
              <img
                src="https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png"
                alt="Go to Settings"
                className="size-4"
              />
            </span>
            <span>Inventory</span>
          </a>
        </div>
      </section>
      
      <section className="p-10">
        <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
        <ul className="flex flex-col gap-4 mt-4">
          {inquiries.map((inquiry) => (
            <RecentActivity 
              key={inquiry.id}
              name={inquiry.name}
              message={inquiry.message}
              createdAt={new Date(inquiry.createdAt)}
            />
          ))}
        </ul>
      </section>
    </MainLayout>
  );
}