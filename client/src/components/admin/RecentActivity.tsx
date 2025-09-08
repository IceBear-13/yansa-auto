export default function RecentActivity() {
  return (
    <li>
      <div className="relative pb-8">
        <div className="relative flex items-start space-x-3">
          <div>
            <div className="relative px-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 ring-8 ring-white">
                <span className="material-symbols-outlined text-white"></span>
              </div>
            </div>
          </div>
          <div className="min-w-0 flex-1 py-1.5">
            <div className="text-sm text-gray-500">
              <span className="font-medium text-gray-900">New inquiry</span>{" "}
              from Alex Johnson
              <span className="whitespace-nowrap float-right">19/10/2024 9:00 AM</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Interested in the '2023 SUV Pro'.
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
