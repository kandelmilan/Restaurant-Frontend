import React, { useState } from "react";
import { Plus, Pencil, Trash, X } from "lucide-react";

const AdminOrders = () => {
    const [orders, setOrders] = useState([
        { id: "ORD-001", customer: "Yuki Tanaka", items: "Butter Chicken ×2", total: "¥4040", status: "Preparing" },
        { id: "ORD-002", customer: "John Doe", items: "Pizza ×1", total: "¥1500", status: "Pending" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        customer: "",
        items: "",
        total: "",
        status: "Pending",
    });

    // Handle Input
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

    // Delete
    const handleDelete = (id) => {
        setOrders(orders.filter((o) => o.id !== id));
    };

    // Submit
    const handleSubmit = () => {
        if (!formData.customer || !formData.items || !formData.total) return;

        if (editId) {
            setOrders(
                orders.map((o) =>
                    o.id === editId ? { ...formData, id: editId } : o
                )
            );
        } else {
            const newOrder = {
                ...formData,
                id: `ORD-${Date.now()}`,
            };
            setOrders([...orders, newOrder]);
        }

        setShowModal(false);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold">Admin Orders</h1>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
                >
                    <Plus size={18} /> Add Order
                </button>
            </div>

            {/* Table */}
            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Customer</th>
                        <th className="p-2">Items</th>
                        <th className="p-2">Total</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="text-center border-t">
                            <td className="p-2">{order.id}</td>
                            <td className="p-2">{order.customer}</td>
                            <td className="p-2">{order.items}</td>
                            <td className="p-2">{order.total}</td>
                            <td className="p-2">{order.status}</td>
                            <td className="p-2 flex justify-center gap-2">
                                <button onClick={() => handleEdit(order)}>
                                    <Pencil size={16} />
                                </button>
                                <button onClick={() => handleDelete(order.id)}>
                                    <Trash size={16} className="text-red-500" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative">

                        {/* Close */}
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

                            <input
                                type="text"
                                name="customer"
                                placeholder="Customer Name"
                                value={formData.customer}
                                onChange={handleChange}
                                className="w-full border p-2 rounded-lg"
                            />

                            <input
                                type="text"
                                name="items"
                                placeholder="Items"
                                value={formData.items}
                                onChange={handleChange}
                                className="w-full border p-2 rounded-lg"
                            />

                            <input
                                type="text"
                                name="total"
                                placeholder="Total"
                                value={formData.total}
                                onChange={handleChange}
                                className="w-full border p-2 rounded-lg"
                            />

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border p-2 rounded-lg"
                            >
                                <option>Pending</option>
                                <option>Preparing</option>
                                <option>Delivered</option>
                            </select>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-1/2 border py-2 rounded-lg"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSubmit}
                                    className="w-1/2 bg-black text-white py-2 rounded-lg"
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