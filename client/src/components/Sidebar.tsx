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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:rotate-180 transition-transform duration-300">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
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