interface SidebarProps {
    isExpanded: boolean;
    onToggle: () => void;
    menuItems: { name: string; link: string; icon: string }[];
    logo: string;
}

function Sidebar(
    { isExpanded, onToggle, menuItems, logo }: SidebarProps
){
    return (

        <aside
            // always keep width for animation, but move off-screen when closed
            className={`fixed left-0 top-0 h-full bg-white shadow-md transition-transform duration-300 z-20 lg:hidden w-64
                ${isExpanded ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'}`}
            aria-expanded={isExpanded}
            aria-hidden={!isExpanded}
        >
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="" className="h-8 w-8 object-cover" />
                    {isExpanded && <span className="text-lg font-semibold">Yansa Auto</span>}
                </div>

                <button
                    onClick={onToggle}
                    aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
                    className="p-2 rounded hover:bg-gray-100"
                >
                    {/* simple chevron rotate */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transition-transform ${isExpanded ? '' : 'rotate-180'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <nav className="mt-4">
                <ul className="space-y-1">
                    {menuItems.map(item => (
                        <li key={item.link}>
                            <a
                                href={item.link}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                            >
                                <span className="w-6 h-6 flex items-center justify-center rounded bg-gray-100">
                                    <img src={item.icon} alt="" className="w-4 h-4" />
                                </span>
                                {isExpanded && <span className="text-sm font-medium">{item.name}</span>}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;