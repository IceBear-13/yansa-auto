const AdminDashboardSkeleton = () => {
    return (
        <div className="animate-pulse">
            {/* Stats Cards Skeleton */}
            <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 p-10">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="rounded-lg bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="h-4 bg-gray-300 rounded w-24"></div>
                            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                        </div>
                        <div className="mt-2 h-8 bg-gray-300 rounded w-16"></div>
                    </div>
                ))}
            </section>

            {/* Quick Actions Skeleton */}
            <section className="mt-8 p-10">
                <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
                <div className="flex flex-wrap gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="h-10 bg-gray-300 rounded w-40"></div>
                    ))}
                </div>
            </section>

            {/* Recent Activity Skeleton */}
            <section className="p-10">
                <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
                <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex items-start space-x-3">
                                <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                                    <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
                                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-300 rounded w-20 mt-2"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminDashboardSkeleton;