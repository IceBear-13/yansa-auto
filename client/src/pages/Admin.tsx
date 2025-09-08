import MainLayout from "../layout/MainLayout";
import { authenticate } from "../api/authApi";
import { useState } from "react";
import RecentActivity from "../components/admin/RecentActivity";

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  onload = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const user = await authenticate(token!);
    if (!user || user.role !== "admin") {
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }
    setIsAdmin(true);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAdmin ? (
    <MainLayout>
      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 p-10">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
            <span className="rounded-full bg-[var(--primary-100)] p-2 text-[var(--primary-600)]">
              <span className="material-symbols-outlined"></span>
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">125</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600">New Listings</p>
          </div>
        </div>
      </section>
      <section className="mt-8 p-10">
        <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          <button className="flex min-w-[150px] items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
            <span className="material-symbols-outlined">
              <img
                src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
                alt="Add new vehicle"
                className="size-4"
              />
            </span>
            <span>Add new vehicle</span>
          </button>
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
          <button className="flex min-w-[150px] items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
            <span className="material-symbols-outlined">
              <img
                src="https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png"
                alt="Go to Settings"
                className="size-4"
              />
            </span>
            <span>Add transactions</span>
          </button>
        </div>
      </section>
      <section className="p-10">
        <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
        <ul className="flex flex-col gap-4 mt-4">
          <RecentActivity />
        </ul>
      </section>
    </MainLayout>
  ) : (
    <div>Access denied</div>
  );
}
