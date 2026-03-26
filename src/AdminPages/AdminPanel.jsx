import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { month: "Jan", revenue: 2400 },
    { month: "Feb", revenue: 1398 },
    { month: "Mar", revenue: 9800 },
    { month: "Apr", revenue: 3908 },
    { month: "May", revenue: 4800 },
    { month: "Jun", revenue: 3800 },
    { month: "Jul", revenue: 4300 },
];

const AdminPanel = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <h2 className="text-2xl font-bold mt-2">1,284</h2>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-500 text-sm">Revenue</p>
                    <h2 className="text-2xl font-bold mt-2">¥2.4M</h2>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-500 text-sm">Menu Items</p>
                    <h2 className="text-2xl font-bold mt-2">8</h2>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-gray-500 text-sm">Customers</p>
                    <h2 className="text-2xl font-bold mt-2">856</h2>
                </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 5, right: 30, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminPanel;