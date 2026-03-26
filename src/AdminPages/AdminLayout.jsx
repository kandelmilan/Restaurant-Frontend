import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const linkClass = (path) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg transition ${location.pathname === path
            ? "bg-orange-100 text-orange-600"
            : "text-gray-600 hover:bg-gray-100"
        }`;

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        navigate("/admin/login");
    };

    return (
        <div className="flex min-h-screen bg-[#f5f3f1]">

            {/* SIDEBAR */}
            <aside className="w-64 bg-white border-r flex flex-col justify-between">

                <div>
                    {/* LOGO */}
                    <div className="p-6 text-xl font-semibold flex items-center gap-2">
                        <span className="text-orange-500 text-2xl">🕉️</span>
                        <span>Admin</span>
                    </div>

                    {/* NAV */}
                    <nav className="flex flex-col gap-2 px-4">

                        <button
                            onClick={() => navigate("/admin")}
                            className={linkClass("/admin")}
                        >
                            Dashboard
                        </button>

                        <button
                            onClick={() => navigate("/admin/orders")}
                            className={linkClass("/admin/orders")}
                        >
                            Orders
                        </button>

                        <button
                            onClick={() => navigate("/admin/menu")}
                            className={linkClass("/admin/menu")}
                        >
                            Menu Items
                        </button>

                    </nav>
                </div>

                {/* LOGOUT */}
                <div className="p-4">
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>

            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-8">
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;