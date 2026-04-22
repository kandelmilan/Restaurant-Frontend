import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Home, List, LogOut, Menu as MenuIcon, X, Moon, Sun } from "lucide-react";
import { Layers, Image, BookOpen, Layout, MessageSquareQuote } from "lucide-react";
import { useDarkMode } from "../RequiredComponents/DarkModeContext";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { darkMode, toggleDark } = useDarkMode();
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: "Dashboard", path: "/admin", icon: <Home size={20} /> },
        { name: "Orders", path: "/admin/orders", icon: <List size={20} /> },
        { name: "Menu Items", path: "/admin/menu", icon: <Layers size={20} /> },
        { name: "Hero Section", path: "/admin/hero", icon: <Image size={20} /> },
        { name: "My Story Section", path: "/admin/story", icon: <BookOpen size={20} /> },
        { name: "Testimonial Section", path: "/admin/testimonial", icon: <MessageSquareQuote size={20} /> },
        { name: "Footer Section", path: "/admin/footer", icon: <Layout size={20} /> },
    ];

    const linkClass = (path) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm w-full ${location.pathname === path
            ? "bg-orange-100 text-orange-600 font-semibold dark:bg-orange-500/20 dark:text-orange-400"
            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        }`;

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        navigate("/admin/login");
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-10 bg-black/50 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-20 h-full w-64
                bg-white dark:bg-gray-800
                border-r border-gray-200 dark:border-gray-700
                shadow-lg transition-transform duration-300 ease-in-out
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
            `}>
                <div className="flex flex-col h-full">

                    {/* Logo */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-xl font-bold text-orange-500">🕉️ Admin</span>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="md:hidden p-1 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => {
                                    navigate(item.path);
                                    setSidebarOpen(false);
                                }}
                                className={linkClass(item.path)}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Bottom */}
                    <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
                        <button
                            onClick={toggleDark}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-lg w-full text-sm
                                text-gray-600 dark:text-gray-300
                                hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                        >
                            {darkMode
                                ? <><Sun size={20} className="text-yellow-400" /><span>Light Mode</span></>
                                : <><Moon size={20} className="text-indigo-400" /><span>Dark Mode</span></>
                            }
                        </button>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-lg w-full text-sm
                                text-red-500 dark:text-red-400
                                hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">

                {/* Mobile top bar */}
                <header className="md:hidden sticky top-0 z-10
                    flex items-center justify-between px-4 py-3
                    bg-white dark:bg-gray-800
                    border-b border-gray-200 dark:border-gray-700 shadow-sm">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-lg text-gray-600 dark:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <MenuIcon size={22} />
                    </button>
                    <span className="text-lg font-bold text-orange-500">🕉️ Admin</span>
                    <button
                        onClick={toggleDark}
                        className="p-2 rounded-lg text-gray-600 dark:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {darkMode
                            ? <Sun size={20} className="text-yellow-400" />
                            : <Moon size={20} className="text-indigo-400" />
                        }
                    </button>
                </header>

                {/* Page content */}
                <main className="flex-1 p-4 md:p-6">
                    <div className="w-full max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;