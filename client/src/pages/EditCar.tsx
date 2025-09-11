import React, { useRef, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { authenticate } from "../api/authApi";
import { editCarByRegistrationNumber, fetchCarByRegisterNumber } from "../api/carApi";
import FormInput from "../components/admin/FormInput";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function EditCar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [car, setCar] = useState<any>(null);

  // Add form state variables
  const [formData, setFormData] = useState({
    registrationNumber: "",
    make: "",
    model: "",
    price: "",
    year: "",
    mileage: "",
    color: "",
    transmission: "",
    fuelType: "",
    description: "",
    featured: false
  });

  
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const user = await authenticate();
      if (user.status === 401 || user.user.role !== "admin") {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      if (id) {
        const carData = await fetchCarByRegisterNumber(id);
        setCar(carData);
      } else {
        window.location.href = "/admin/add-new-car";
      }

      setIsAdmin(true);
      setIsLoading(false);
    };
    load();
  }, [id]);

  useEffect(() => {
  if (car && car.car) {
    setFormData({
      registrationNumber: car.car.registrationNumber || "",
      make: car.car.manufacturer || "",
      model: car.car.model || "",
      price: car.car.price || "",
      year: car.car.year || "",
      mileage: car.car.mileage || "",
      color: car.car.color || "",
      transmission: car.car.transmission || "",
      fuelType: car.car.fuelType || "",
      description: car.car.description || "",
      featured: car.car.featured || false
    });
    setFiles(car.images || []);
  }
}, [car]);


  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle form input changes
  const handleInputChange = (field: string, value: string | React.ChangeEvent<HTMLInputElement>) => {
  const actualValue = typeof value === 'string' ? value : value.target.value;
  
  // Handle featured field as boolean
    if (field === 'featured') {
        const booleanValue = actualValue.toLowerCase() === 'true';
        setFormData(prev => ({
        ...prev,
        [field]: booleanValue
        }));
    } else {
        setFormData(prev => ({
        ...prev,
        [field]: actualValue
        }));
    }
    };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      // Append to existing files instead of replacing
      setFiles((prev) => [...prev, ...newFiles]);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  if (files.length > 5) {
    alert("You can upload a maximum of 5 files.");
    setFiles(files.slice(0, 5));
  }

const submit = async () => {
  // Validate required fields
  if (!formData.registrationNumber || !formData.make || !formData.model || !formData.price) {
    alert("Please fill in all required fields");
    return;
  }

  // Create FormData object
  const formDataToSend = new FormData();
  
  // Append all form fields
  formDataToSend.append('registrationNumber', formData.registrationNumber);
  formDataToSend.append('manufacturer', formData.make);
  formDataToSend.append('model', formData.model);
  formDataToSend.append('price', formData.price);
  formDataToSend.append('year', formData.year);
  formDataToSend.append('mileage', formData.mileage);
  formDataToSend.append('color', formData.color);
  formDataToSend.append('transmission', formData.transmission);
  formDataToSend.append('fuelType', formData.fuelType);
  formDataToSend.append('description', formData.description);
  formDataToSend.append('featured', formData.featured.toString());
  
  // Append all image files
  files.forEach((file) => {
    formDataToSend.append('images', file);
  });

  try {
    const response = await editCarByRegistrationNumber(car.car.registrationNumber, formDataToSend);
    if (response) {
      alert("Car updated successfully!");
      // Optionally redirect back to admin panel
      // window.location.href = "/admin";
    } else {
      alert("Failed to update car");
    }
  } catch (error) {
    console.error("Error updating car:", error);
    alert("Error updating car");
  }
}

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAdmin ? (
    <MainLayout>
      <form className="bg-white p-6 px-10 rounded-lg border border-gray-200" onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Upload Images
        </h2>
        <div
          className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
            isDragOver
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 16a4 4 0 01-4-4V6a4 4 0 014-4h10a4 4 0 014 4v6a4 4 0 01-4 4H7z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
            <path
              d="M16 16v1a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h1"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
          <p className="text-sm font-medium text-gray-700">
            Drag &amp; drop or click to upload
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          <button
            className="mt-2 flex items-center justify-center rounded-md h-9 px-4 bg-gray-100 text-gray-800 text-sm font-semibold hover:cursor-pointer hover:bg-gray-200"
            onClick={handleBrowseClick}
            type="button"
          >
            Browse Files
          </button>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/png, image/jpeg, image/gif"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {files.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">
              Selected files ({files.length}):
            </p>
            <div className="space-y-2">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    onClick={() => removeFile(idx)}
                    className="text-red-500 hover:text-red-700 text-sm"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg border border-gray-200 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Core Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <FormInput 
              label="Registration Number" 
              id="registrationNumber" 
              type="text" 
              placeholder="e.g. B 1234 CD" 
              value={formData.registrationNumber} 
              onChange={(value) => handleInputChange('registrationNumber', value)} 
            />
            <FormInput 
              label="Make" 
              id="make" 
              type="text" 
              placeholder="e.g. Audi" 
              value={formData.make} 
              onChange={(value) => handleInputChange('make', value)} 
            />
            <FormInput 
              label="Model" 
              id="model" 
              type="text" 
              placeholder="e.g. A4" 
              value={formData.model} 
              onChange={(value) => handleInputChange('model', value)} 
            />
            <div className="">
              <label
                className="block text-sm font-medium text-gray-700 pb-1.5"
                htmlFor="price"
              >
                Price
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                  <span className="text-gray-500 sm:text-sm">Rp</span>
                </div>
                <input
                  aria-describedby="price-currency"
                  className="form-input w-full rounded-md border-gray-300 pl-8 pr-12 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-2"
                  id="price"
                  name="price"
                  placeholder="0.00"
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span
                    className="text-gray-500 sm:text-sm"
                    id="price-currency"
                  >
                    IDR
                  </span>
                </div>
              </div>
            </div>
            <FormInput 
              value={formData.year} 
              label="Year" 
              id="year" 
              type="number" 
              placeholder="e.g. 2020" 
              onChange={(value) => handleInputChange('year', value)} 
            />
            <FormInput 
              label="Mileage (km)" 
              id="mileage" 
              type="number" 
              placeholder="e.g. 15000" 
              value={formData.mileage} 
              onChange={(value) => handleInputChange('mileage', value)} 
            />
            <FormInput 
              label="Color" 
              id="color" 
              type="text" 
              placeholder="e.g. Black" 
              value={formData.color} 
              onChange={(value) => handleInputChange('color', value)} 
            />
            <FormInput 
              label="Transmission" 
              id="transmission" 
              type="text" 
              placeholder="e.g. Automatic" 
              value={formData.transmission} 
              onChange={(value) => handleInputChange('transmission', value)} 
            />
            <FormInput 
              label="Fuel Type" 
              id="fuelType" 
              type="text" 
              placeholder="e.g. Petrol" 
              value={formData.fuelType} 
              onChange={(value) => handleInputChange('fuelType', value)} 
            />
            <FormInput 
              label="Description" 
              id="description"
              type="text" 
              placeholder="e.g. A4" 
              value={formData.description} 
              onChange={(value) => handleInputChange('description', value)} 
            />
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    featured: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Featured Car</span>
              </label>
            </div>
            <div className="col-span-1 md:col-span-2 mt-6"></div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 col-span-2 hover:cursor-pointer"
              onClick={submit}
            >
              Edit Car
            </button>
          </div>
        </div>
      </form>
    </MainLayout>
  ) : (
    <div>
      Admin only.
    </div>
  );
}