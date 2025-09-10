export default function FormInput({ label, id, type, placeholder, value, onChange }: { label: string; id: string; type: string; placeholder?: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
            <div>
              <label
                className="block text-sm font-medium text-gray-700 pb-1.5"
                htmlFor={id}
              >
                {label}
              </label>
              <input
                className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-2"
                id={id}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                name={id}
              />
            </div>
    )
}