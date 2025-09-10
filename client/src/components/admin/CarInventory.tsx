import { deleteCarByRegistrationNumber } from "../../api/carApi";

interface Car {
    registrationNumber: string;
    model: string;
    year: number;
    price: number;
    imageUrl: string;
}

export function CarInventory({registrationNumber, model, year, price, imageUrl}: Car) {
  const removeClick = async () => {
    const response = await deleteCarByRegistrationNumber(registrationNumber);
    if (response.status === 200) {
      alert("Car removed successfully");
      window.location.reload();
    } else {
      alert("Failed to remove car");
    }
  }
  return (
    <tr>
      <td className="whitespace-nowrap px-6 py-4">
        <img
          alt={model}
          className="h-10 w-10 rounded-full object-cover"
          src={imageUrl}
        />
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
        {model}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
        {registrationNumber}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
        {year}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
        {price}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
        {model}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
        {registrationNumber}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
        {year}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
        {price}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
        <button className="text-primary-600 hover:text-primary-800 hover:underline hover:cursor-pointer" onClick={() => {}}>
          Edit
        </button>
        <span className="mx-2 text-gray-300">|</span>
        <button className="text-red-600 hover:text-red-800 hover:cursor-pointer hover:underline" onClick={() => {removeClick() }}>
          Remove
        </button>
      </td>
    </tr>
  );
}
