// ...existing code...
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
      { name: "Home", link: "/", icon: "https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-house-icon-png-image_695369.jpg" },
      { name: "About", link: "/about", icon: "https://e7.pngegg.com/pngimages/211/607/png-clipart-computer-icons-information-about-us-miscellaneous-logo-thumbnail.png" },
      { name: "Cars", link: "/cars", icon: "https://www.pngarc.com/wp-content/uploads/2023/05/Sports-car-Super-car-car-icon-compact-car-vintage-car-logo-png-free-download.png" },
      { name: "Contact", link: "/contact", icon: "https://icons.veryicon.com/png/o/miscellaneous/template-4/telephone-contact-1.png" },
      { name: "Services", link: "/services", icon: "https://img.freepik.com/premium-vector/service-icon_593228-374.jpg" },
    ];
    const logo = "/446219677_433806359508565_6937796297832185769_n-removebg-preview.png";

    return (
        <div className="min-h-screen flex flex-col">
            <Sidebar
                isExpanded={isSidebarOpen}
                onToggle={() => setSidebarOpen(v => !v)}
                menuItems={menuItems}
                logo={logo}
            />

            <div
                role="button"
                aria-hidden={!isSidebarOpen}
                onClick={() => setSidebarOpen(false)}
                className={`fixed inset-0 bg-black transition-opacity duration-300 z-10 ${isSidebarOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            />

            <Header onToggle={() => setSidebarOpen(v => !v)} curPage={window.location.pathname}/>

            <main className="flex-grow bg-gray-50">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout;
// ...existing code...