
const Header = ({ onToggle, curPage }: { onToggle?: () => void, curPage: string }) => {

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Cars", href: "/cars" },
    { name: "Contact", href: "/contact" },
  ];
  
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
        <form className="hidden lg:flex ml-8 items-center gap-2">
          <input
            type="text"
            placeholder="Search cars..."
            className="px-4 py-2 rounded-full outline-none bg-gray-200 text-base font-medium"   
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 text-base font-medium"
          >
            Search
          </button>
        </form>
        <img
          src="https://freesvg.org/img/abstract-user-flat-4.png"
          alt="Profile"
          className="w-10 h-10 rounded-full ml-2 object-cover hover:cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;