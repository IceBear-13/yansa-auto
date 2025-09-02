const Header = () => {
    return (
    <header className="p-4 pl-10 justify-between items-center overflow-y-scroll lg:flex hidden">
            <nav className="flex gap-20 justify-between">
                <h1 className="text-base font-medium">Yansa Auto</h1>
                <ul className="flex gap-4 text-gray-600">
                    <li><a href="/" className="text-base font-medium px-2 py-1 hover:text-gray-800">Home</a></li>
                    <li><a href="/about" className="text-base font-medium px-2 py-1 hover:text-gray-800">About</a></li>
                    <li><a href="/cars" className="text-base font-medium px-2 py-1 hover:text-gray-800">Cars</a></li>
                    <li><a href="/contact" className="text-base font-medium px-2 py-1 hover:text-gray-800">Contact</a></li>
                    <li><a href="/services" className="text-base font-medium px-2 py-1 hover:text-gray-800">Services</a></li>
                    
                </ul>
            </nav>
            <div className="flex">
                <form className="ml-8 flex items-center gap-2">
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
}

export default Header;
