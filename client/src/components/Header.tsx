import { useEffect } from "react";
import { authenticate } from "../api/authApi";
import { useState } from "react";

const Header = ({ onToggle, curPage }: { onToggle?: () => void, curPage: string }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authenticate();
      setIsAuthenticated(isAuth.status === 200);
    };
    checkAuth();
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Cars", href: "/cars" },
    { name: "Contact", href: "/contact" },
  ];

  let dropdownItems = [];

  if (isAuthenticated) {
    dropdownItems = [
      { name: "Logout", href: "/logout" },
    ];
  } else {
    dropdownItems = [
      { name: "Login", href: "/login" },
      { name: "Register", href: "/register" },
    ];
  }

  return (
  <header className="p-4 justify-between overflow-y-scroll flex items-center">
      <div>
        <button
          onClick={onToggle}
          className="lg:hidden block p-2 rounded-md hover:bg-gray-200 transition-colors size-10"
          aria-label="Toggle sidebar"
        >
            <img src="/burger-menu-svgrepo-com.svg" alt="Menu" className="hover:rotate-180 transition-transform duration-300"/>
        </button>
      </div>
      <div className="lg:hidden block">
        <h1 className="text-base font-medium">Yansa Auto</h1>
      </div>
      <nav className="hidden gap-15 lg:flex lg:items-center lg:justify-start lg:flex-1">
        <div className="flex gap-2 items-center">
            <img src="/446219677_433806359508565_6937796297832185769_n-removebg-preview.png" alt="" className="h-8 w-8 object-cover" />
            <h1 className="text-base font-medium">Yansa Auto</h1>
        </div>
        <ul className="flex gap-4 text-gray-600">
          {navItems.map(item => {
            const isActive = item.href === '/'
              ? curPage === '/'
              : curPage.startsWith(item.href);
             return (
               <li key={item.href}>
                 <a
                   href={item.href}
                   aria-current={isActive ? "page" : undefined}
                   className={`text-base font-medium px-2 py-1 hover:text-gray-800 ${isActive ? 'text-blue-600' : ''}`}
                 >
                   {item.name}
                 </a>
               </li>
             );
           })}
        </ul>
      </nav>
      <div className="flex">
        <img
          src="https://freesvg.org/img/abstract-user-flat-4.png"
          alt="Profile"
          className="w-10 h-10 rounded-full ml-2 object-cover hover:cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50 top-15">
              <ul className="py-1">
                {dropdownItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </header>

  );
};

export default Header;