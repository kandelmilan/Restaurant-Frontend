import React, { useState } from "react";
import { Plus, Pencil, Trash, X } from "lucide-react";

const AdminMenu = () => {
    const [menuItems, setMenuItems] = useState([
        {
            id: 1,
            name: "Butter Chicken",
            price: "¥1,450",
            image: "https://via.placeholder.com/60",
        },
        {
            id: 2,
            name: "Palak Paneer",
            price: "¥1,200",
            image: "https://via.placeholder.com/60",
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ name: "", price: "", image: "" });

    // Input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Open Add Modal
    const handleAdd = () => {
        setFormData({ name: "", price: "", image: "" });
        setEditId(null);
        setShowModal(true);
    };

    // Open Edit Modal
    const handleEdit = (item) => {
        setFormData(item);
        setEditId(item.id);
        setShowModal(true);
    };

    // Cancel modal
    const handleCancel = () => setShowModal(false);

    // Submit Add/Edit
    const handleSubmit = () => {
        if (!formData.name || !formData.price || !formData.image) return;

        if (editId) {
            setMenuItems(
                menuItems.map((item) =>
                    item.id === editId ? { ...item, ...formData } : item
                )
            );
        } else {
            const newItem = {
                id: menuItems.length + 1,
                ...formData,
            };
            setMenuItems([...menuItems, newItem]);
        }

        setShowModal(false);
    };

    // Delete item
    const handleDelete = (id) => {
        if (window.confirm("Delete this menu item?")) {
            setMenuItems(menuItems.filter((item) => item.id !== id));
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Menu Items</h1>
                <button
                    onClick={handleAdd}
                    className="bg-black text-white p-3 rounded-full hover:bg-gray-800"
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* Menu Table */}
            <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Image</th>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Price</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-3">{item.id}</td>
                            <td className="px-6 py-3">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-12 h-12 object-cover rounded-md"
                                />
                            </td>
                            <td className="px-6 py-3">{item.name}</td>
                            <td className="px-6 py-3">{item.price}</td>
                            <td className="px-6 py-3 flex gap-3">
                                <button onClick={() => handleEdit(item)}>
                                    <Pencil size={18} className="text-blue-600" />
                                </button>
                                <button onClick={() => handleDelete(item.id)}>
                                    <Trash size={18} className="text-red-600" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
                        {/* Close */}
                        <button
                            onClick={handleCancel}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-semibold mb-5 text-center">
                            {editId ? "Edit Menu Item" : "Add Menu Item"}
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Name</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Item Name"
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Price</label>
                                <input
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="¥0"
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Image URL</label>
                                <input
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div className="flex gap-3 pt-3">
                                <button
                                    onClick={handleCancel}
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

export default AdminMenu;