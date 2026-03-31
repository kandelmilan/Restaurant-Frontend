import React, { useState } from "react";
import { Plus, Pencil, Trash, X } from "lucide-react";

const AdminOrders = () => {
    const [orders, setOrders] = useState([
        { id: "ORD-001", customer: "Tanaka Yuki", items: "Butter Chicken ×2", total: "¥4,040", status: "Preparing" },
        { id: "ORD-002", customer: "Sato Kenji", items: "Chicken Biryani ×1", total: "¥2,750", status: "Pending" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        customer: "",
        items: "",
        total: "",
        status: "Pending",
    });

    // Input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Open Add Modal
    const handleAdd = () => {
        setFormData({ customer: "", items: "", total: "", status: "Pending" });
        setEditId(null);
        setShowModal(true);
    };

    // Open Edit Modal
    const handleEdit = (order) => {
        setFormData(order);
        setEditId(order.id);
        setShowModal(true);
    };

    // Submit (Add / Edit)
    const handleSubmit = () => {
        if (!formData.customer || !formData.items || !formData.total) return;

        if (editId) {
            setOrders(
                orders.map((o) =>
                    o.id === editId ? { ...o, ...formData } : o
                )
            );
        } else {
            const newOrder = {
                id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
                ...formData,
            };
            setOrders([...orders, newOrder]);
        }

        setShowModal(false);
    };

    // Delete with alert
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this order?");
        if (confirmDelete) {
            setOrders(orders.filter((o) => o.id !== id));
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Orders</h1>

                {/* + Icon */}
                <button
                    onClick={handleAdd}
                    className="bg-black text-white p-3 rounded-full"
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* Table */}
            <table className="min-w-full bg-white rounded-xl shadow">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left">Order</th>
                        <th className="px-6 py-3 text-left">Customer</th>
                        <th className="px-6 py-3 text-left">Items</th>
                        <th className="px-6 py-3 text-left">Total</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="border-b">
                            <td className="px-6 py-3">{order.id}</td>
                            <td className="px-6 py-3">{order.customer}</td>
                            <td className="px-6 py-3">{order.items}</td>
                            <td className="px-6 py-3">{order.total}</td>

                            <td className={`px-6 py-3 font-semibold ${order.status === "Delivered"
                                ? "text-green-600"
                                : order.status === "Preparing"
                                    ? "text-blue-600"
                                    : "text-yellow-600"
                                }`}>
                                {order.status}
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-3 flex gap-3">
                                <button onClick={() => handleEdit(order)}>
                                    <Pencil size={18} className="text-blue-600" />
                                </button>

                                <button onClick={() => handleDelete(order.id)}>
                                    <Trash size={18} className="text-red-600" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* MODAL */}
            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-fadeIn">

                        {/* Close Button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black"
                        >
                            <X size={20} />
                        </button>

                        {/* Title */}
                        <h2 className="text-2xl font-semibold mb-5 text-center">
                            {editId ? "Edit Order" : "Add Order"}
                        </h2>

                        {/* Form */}
                        <div className="space-y-4">

                            {/* Customer */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Customer Name</label>
                                <input
                                    type="text"
                                    name="customer"
                                    value={formData.customer}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Items */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Items</label>
                                <input
                                    type="text"
                                    name="items"
                                    value={formData.items}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Total */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Total</label>
                                <input
                                    type="text"
                                    name="total"
                                    value={formData.total}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                >
                                    <option>Pending</option>
                                    <option>Preparing</option>
                                    <option>Delivered</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-1/2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSubmit}
                                    className="w-1/2 bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                                >
                                    {editId ? "Update" : "Add"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;