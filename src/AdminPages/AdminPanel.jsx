import React from "react";

const AdminPanel = () => {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <h2 className="text-2xl font-bold mt-2">1,284</h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-gray-500 text-sm">Revenue</p>
                    <h2 className="text-2xl font-bold mt-2">¥2.4M</h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-gray-500 text-sm">Menu Items</p>
                    <h2 className="text-2xl font-bold mt-2">8</h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-gray-500 text-sm">Customers</p>
                    <h2 className="text-2xl font-bold mt-2">856</h2>
                </div>

            </div>
        </div>
    );
};

export default AdminPanel;