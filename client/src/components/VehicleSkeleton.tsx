const VehicleSkeleton = () => {
    return (
        <div className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
            {/* Image skeleton */}
            <div className="w-full h-48 bg-gray-300"></div>
            
            {/* Content skeleton */}
            <div className="p-6">
                {/* Title skeleton */}
                <div className="h-6 bg-gray-300 rounded mb-3"></div>
                
                {/* Description skeleton */}
                <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
                
                {/* Price skeleton */}
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                
                {/* Button skeleton */}
                <div className="mt-4 h-10 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
};

export default VehicleSkeleton;