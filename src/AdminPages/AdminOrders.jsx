import React, { useState } from "react";
import { Plus, Pencil, Trash, X } from "lucide-react";

const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Preparing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const AdminOrders = () => {
    const [orders, setOrders] = useState([
        { id: "ORD-001", customer: "Yuki Tanaka", items: "Butter Chicken ×2", total: "¥4040", status: "Preparing" },
        { id: "ORD-002", customer: "John Doe", items: "Pizza ×1", total: "¥1500", status: "Pending" },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ customer: "", items: "", total: "", status: "Pending" });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAdd = () => {
        setFormData({ customer: "", items: "", total: "", status: "Pending" });
        setEditId(null);
        setShowModal(true);
    };

    const handleEdit = (order) => {
        setFormData(order);
        setEditId(order.id);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this order?")) setOrders(orders.filter((o) => o.id !== id));
    };

    const handleSubmit = () => {
        if (!formData.customer || !formData.items || !formData.total) return;
        if (editId) {
            setOrders(orders.map((o) => o.id === editId ? { ...formData, id: editId } : o));
        } else {
            setOrders([...orders, { ...formData, id: `ORD-${Date.now()}` }]);
        }
        setShowModal(false);
    };

    const inputClass = "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500";

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Orders</h1>
                <button onClick={handleAdd} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition">
                    <Plus size={18} /> <span className="hidden sm:inline">Add Order</span>
                </button>
            </div>

            {/* Mobile cards */}
            <div className="block md:hidden space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-white">{order.customer}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{order.id}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(order)}><Pencil size={16} className="text-blue-500" /></button>
                                <button onClick={() => handleDelete(order.id)}><Trash size={16} className="text-red-500" /></button>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{order.items}</p>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-800 dark:text-white">{order.total}</span>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[order.status]}`}>{order.status}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            {["ID", "Customer", "Items", "Total", "Status", "Actions"].map((h) => (
                                <th key={h} className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="px-6 py-3 text-gray-600 dark:text-gray-400 text-sm">{order.id}</td>
                                <td className="px-6 py-3 text-gray-800 dark:text-white font-medium">{order.customer}</td>
                                <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{order.items}</td>
                                <td className="px-6 py-3 text-gray-800 dark:text-white font-medium">{order.total}</td>
                                <td className="px-6 py-3">
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[order.status]}`}>{order.status}</span>
                                </td>
                                <td className="px-6 py-3 flex gap-3">
                                    <button onClick={() => handleEdit(order)}><Pencil size={18} className="text-blue-500" /></button>
                                    <button onClick={() => handleDelete(order.id)}><Trash size={18} className="text-red-500" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 dark:text-gray-400"><X size={20} /></button>
                        <h2 className="text-2xl font-semibold mb-5 text-center text-gray-800 dark:text-white">{editId ? "Edit Order" : "Add Order"}</h2>
                        <div className="space-y-4">
                            <input name="customer" placeholder="Customer Name" value={formData.customer} onChange={handleChange} className={inputClass} />
                            <input name="items" placeholder="Items" value={formData.items} onChange={handleChange} className={inputClass} />
                            <input name="total" placeholder="Total" value={formData.total} onChange={handleChange} className={inputClass} />
                            <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
                                {["Pending", "Preparing", "Delivered"].map((s) => <option key={s}>{s}</option>)}
                            </select>
                            <div className="flex gap-3 pt-2">
                                <button onClick={() => setShowModal(false)} className="w-1/2 border border-gray-300 dark:border-gray-600 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
                                <button onClick={handleSubmit} className="w-1/2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg">{editId ? "Update" : "Add"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;