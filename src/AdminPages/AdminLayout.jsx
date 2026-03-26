import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Home, List, Box, LogOut, Menu as MenuIcon } from "lucide-react";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: "Dashboard", path: "/admin", icon: <Home size={20} /> },
        { name: "Orders", path: "/admin/orders", icon: <List size={20} /> },
        { name: "Menu Items", path: "/admin/menu", icon: <Box size={20} /> },
    ];

    const linkClass = (path) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${location.pathname === path
            ? "bg-orange-100 text-orange-600 font-semibold"
            : "text-gray-600 hover:bg-gray-100"
        }`;

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        navigate("/admin/login");
    };

    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-20 h-full w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
            >
                <div className="flex flex-col justify-between h-full">
                    {/* Logo */}
                    <div className="p-6 flex items-center gap-2 text-2xl font-bold text-orange-500">
                        🕉️ Admin
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-2 px-2">
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={linkClass(item.path)}
                            >
                                {item.icon}
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="p-4">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 w-full"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 flex justify-center items-start p-6">
                <div className="w-full max-w-6xl">
                    {/* Mobile menu button */}
                    <div className="md:hidden mb-4 flex justify-start">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 bg-white rounded-lg shadow"
                        >
                            <MenuIcon size={24} />
                        </button>
                    </div>

                    {/* Outlet - main content */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;