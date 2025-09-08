import { fetchCarByRegisterNumber } from "../api/carApi";
import MainLayout from "../layout/MainLayout";
import { useEffect, useState } from "react";

function CarDetails() {
  const images: string[] = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBLCU9X8h8-b38_wrTYdsrzQud6kDPwxwUvZCx8smyYdcMFvkCtf4S1PU16SemoVqIeE9O98styxwL7WSlb1uRKLX7ebPTNixdP5jiXs_dFBbCiWwqy0DIay4R798FVTiuwgJW8b4ryvWIj2FNCIm3DGflCeG1ZLIZvFBQA6d3uNscIMNOOGX_DF-fqvxV7fOK_DrG613D7DSDVVdaNv6TPFxClFVvcvB9nD653xcxQIxN_lBaX5hYZ5NCdBlBtunOojcaMeyOf",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBlm0JUofmG93iRP32q60-L9ZgA78N3VF2dilA-KuBm7ITcIuZewBNbOvjZ_zpxutsw-2AIkSRFMXOwMvVskSBf7GkduqgXMTMBat0Uig9uJFH6Akm7HxIFQhpUN2aewu2T_qLcwi6NSP0H1dZxwqshxx_YtqUATGriccir7QQQbhwsi2j7H5jyxmTpyWRf7ZTk3_xvRwXGffKif55Q8RdUoP8Yh-eRgdytpGFUByMOlb0zMihZe2q1bXsQIO24dwNGmzdugP4f",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD8ygjPtSJor3hK2udZYJ1i7QLfSZxBLU8OJ50YbcDf2v9YhLypf0lO9GHxo-2ZqxhGEoMdxMiBTtDNGKh3fLvaYEm9Yy8s9dCM4Ax7MymGieR2FwPbaoZlLi-C1CIMrtQsY2l0RzNZc7YNV3_CT5ukCELkffsoKUv0F93ri83Q5Uasbf_pjRk7J9jVKgxqgavNfG137CqsjX3eibjY3iYljfUmBSE55EL6k2D0Z0QMXjbpfKcNJ4hXEK0P3cENB5G6qiQksc7Z",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDXffwOIiMA-LOPI9P8uH5XCBQvllmdbD-0xM2rIPwyDKhe_UYKUFShXvFabvZ-VNYJy6M_virDmgk89XZd1TgQbIAoka418f0Ak3DsvnYv6k527c8m-BJH6_K4usgEqs7uK7KlgLm3yyYuAej68Mgcrf6-TEOdRu36TV-O6Ude0BMgqXwQEO2ibKZgkTG_pXpHcE2AJwJB5NqyGhbpLrcIGmyQ90AzBl4FEQqM-C3qScyhGxftTHAw4KKnN88ZpzZd83vn3--c",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBJwrRyAER6GFf7Y6HGxBqDootWPZrwr39tpuzIp-sEf0Ay91BsMky8Y-t4pGaA4db0wcJYTQDUJoXda-plIfE-w7UjwdPcnqlfkVlz2kCKRKNBpyGLLfWwl7RBS8fp6JtnU9Jc-osgdThZomUDaAOLjirrjcWbKRs_jRFe6AilqSMXgpX-tnaxVcvjai9axIhSOhnJMm6r1BDd4Upuk6FIK-rDkW5kdC7WTJ5u8e641gNCKVKqsHGp134LU4gdxkLu4MNuUnC9",
  ];


  const [car, setCar] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const carId = window.location.pathname.split("/").pop();

  console.log(carId);

  useEffect(() => {
    const loadCar = async () => {
      if (carId) {
        const carData = await fetchCarByRegisterNumber(carId);
        setCar(carData);
        console.log(carData);
      }
    };
    loadCar();
  }, [carId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-ID", {
        style: "currency",
        currency: "IDR",
    }).format(price);
  };

  if (!car) {
    return <div>Loading...</div>;
  }


  return (
    <MainLayout>
      <div className="w-full px-10 mb-20 mt-10">
        <div className="mb-6 text-sm text-gray-500">
          <a className="hover:text-blue-600" href="/cars">
            Cars
          </a>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-800">{car.manufacturer} {car.model}</span>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <div className="bg-cover bg-center aspect-[4/3]">
                <img
                  src={images[selectedIndex]}
                  alt="Car Image"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.slice(0, 5).map((_, idx) => (
                  <button
                    key={idx}
                    className={
                      selectedIndex === idx
                        ? "size-2 rounded-full bg-white shadow-sm"
                        : "size-2 rounded-full bg-white/60 shadow-sm"
                    }
                    onClick={() => setSelectedIndex(idx)}
                    aria-label={`Select image ${idx + 1}`}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-4">
              {images.map((src, i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-md ${
                    selectedIndex === i ? "border-2 border-blue-500" : ""
                  }`}
                >
                  <img
                    alt={`Thumbnail ${i + 1}`}
                    className={`h-full w-full object-cover ${
                      selectedIndex === i
                        ? ""
                        : "opacity-70 hover:opacity-100 transition"
                    }`}
                    src={src}
                    onClick={() => setSelectedIndex(i)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {car.model}
            </h1>
            <p className="mt-4 text-gray-600">
              {car.description}
            </p>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                Specifications
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-gray-200 pt-4">
                <div>
                  <p className="text-sm text-gray-500">Year</p>
                  <p className="font-medium text-gray-800">{car.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fuel Economy</p>
                  <p className="font-medium text-gray-800">{car.fuelType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Color</p>
                  <p className="font-medium text-gray-800">{car.color}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mileage</p>
                  <p className="font-medium text-gray-800">{car.mileage} KM</p>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-gray-900">Pricing</h2>
              <p className="mt-2 text-3xl font-bold text-blue-600 ">
                {formatPrice(car.price)}
              </p>
              <div className="mt-6 flex gap-4">
                <button className="flex flex-1 items-center justify-center rounded-lg hover:bg-white hover:text-blue-700 px-6 py-3 text-base font-bold text-white shadow-md bg-blue-700 transition-all">
                  <span>Inquire Now</span>
                </button>
                <button className="flex flex-1 items-center justify-center rounded-lg bg-gray-200 px-6 py-3 text-base font-bold text-gray-800 shadow-md hover:bg-gray-300 transition-all">
                  <span>Book a Test Drive</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}

export default CarDetails;