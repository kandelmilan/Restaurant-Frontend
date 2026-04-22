import React from "react";
import {
    LineChart, Line, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer,
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

const stats = [
    { label: "Total Orders", value: "1,284", icon: "🧾" },
    { label: "Revenue", value: "¥2.4M", icon: "💴" },
    { label: "Menu Items", value: "8", icon: "🍛" },
    { label: "Customers", value: "856", icon: "👥" },
];

const AdminPanel = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Dashboard
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label}
                        className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow
                            border border-gray-100 dark:border-gray-700">
                        <div className="text-2xl mb-2">{stat.icon}</div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">{stat.label}</p>
                        <h2 className="text-xl font-bold mt-1 text-gray-800 dark:text-white">
                            {stat.value}
                        </h2>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow
                border border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                    Monthly Revenue
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                        <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1f2937",
                                border: "none",
                                borderRadius: "8px",
                                color: "#f9fafb"
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#f97316"
                            strokeWidth={3}
                            dot={{ fill: "#f97316", r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminPanel; 2