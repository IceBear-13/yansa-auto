interface FeaturedVehiclesProps {
    image: string;
    title: string;
    description: string;
    price: string;
}

const FeaturedVehicles = ({ image, title, description, price }: FeaturedVehiclesProps) => {
    return (
        <div className="transform overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105">
            <img src={image} alt={title} className="h-56 w-full object-cover object-center"/>
            <div className="p-6">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-gray-600">{description}</p>
                <p className="mt-2 text-lg font-bold">{price}</p>
            </div>
        </div>
    )
}

export default FeaturedVehicles;