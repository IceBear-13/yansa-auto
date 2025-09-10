const InventorySkeleton = () => {
    return (
        <div className="animate-pulse">
            {/* Header skeleton */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="h-8 bg-gray-300 rounded w-64"></div>
                <div className="h-10 bg-gray-300 rounded w-40"></div>
            </div>

            {/* Search bar skeleton */}
            <div className="mb-6">
                <div className="relative">
                    <div className="h-10 bg-gray-300 rounded-md w-full"></div>
                </div>
            </div>

            {/* Table skeleton */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-md">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">
                                <div className="h-4 bg-gray-300 rounded w-12"></div>
                            </th>
                            <th className="px-6 py-3">
                                <div className="h-4 bg-gray-300 rounded w-16"></div>
                            </th>
                            <th className="px-6 py-3">
                                <div className="h-4 bg-gray-300 rounded w-32"></div>
                            </th>
                            <th className="px-6 py-3">
                                <div className="h-4 bg-gray-300 rounded w-12"></div>
                            </th>
                            <th className="px-6 py-3">
                                <div className="h-4 bg-gray-300 rounded w-16"></div>
                            </th>
                            <th className="px-6 py-3 text-right">
                                <div className="h-4 bg-gray-300 rounded w-16 ml-auto"></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4">
                                    <div className="h-16 w-20 bg-gray-300 rounded"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-4 bg-gray-300 rounded w-28"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-4 bg-gray-300 rounded w-12"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <div className="h-8 w-16 bg-gray-300 rounded"></div>
                                        <div className="h-8 w-16 bg-gray-300 rounded"></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InventorySkeleton;