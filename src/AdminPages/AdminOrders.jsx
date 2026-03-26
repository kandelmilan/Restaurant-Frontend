import React from "react";

const orders = [
    { id: "ORD-001", customer: "Tanaka Yuki", items: "Butter Chicken ×2", total: "¥4,040", status: "Preparing" },
    { id: "ORD-002", customer: "Sato Kenji", items: "Chicken Biryani ×1", total: "¥2,750", status: "Pending" },
];

const AdminOrders = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <table className="min-w-full bg-white rounded-xl shadow">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left">Order</th>
                        <th className="px-6 py-3 text-left">Customer</th>
                        <th className="px-6 py-3 text-left">Items</th>
                        <th className="px-6 py-3 text-left">Total</th>
                        <th className="px-6 py-3 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="border-b">
                            <td className="px-6 py-3">{order.id}</td>
                            <td className="px-6 py-3">{order.customer}</td>
                            <td className="px-6 py-3">{order.items}</td>
                            <td className="px-6 py-3">{order.total}</td>
                            <td className={`px-6 py-3 rounded-full text-sm font-semibold ${order.status === "Delivered" ? "text-green-600" :
                                    order.status === "Preparing" ? "text-blue-600" :
                                        "text-yellow-600"
                                }`}>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrders;