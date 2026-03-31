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
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl w-[400px] relative">

                        {/* Close */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3"
                        >
                            <X />
                        </button>

                        <h2 className="text-xl font-bold mb-4">
                            {editId ? "Edit Order" : "Add Order"}
                        </h2>

                        <div className="space-y-3">
                            <input
                                type="text"
                                name="customer"
                                placeholder="Customer Name"
                                value={formData.customer}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />

                            <input
                                type="text"
                                name="items"
                                placeholder="Items"
                                value={formData.items}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />

                            <input
                                type="text"
                                name="total"
                                placeholder="Total"
                                value={formData.total}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            >
                                <option>Pending</option>
                                <option>Preparing</option>
                                <option>Delivered</option>
                            </select>

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-black text-white py-2 rounded"
                            >
                                {editId ? "Update Order" : "Add Order"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;