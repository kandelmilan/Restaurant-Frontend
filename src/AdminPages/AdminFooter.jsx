import React, { useState } from "react";
import { Plus, Pencil, Trash, X } from "lucide-react";

const AdminFooter = () => {
    const [footers, setFooters] = useState([
        {
            id: "FOOT-001",
            description: "Hand-ground spices meet seasonal Japanese produce.",
            address: "2-14-5 Minami-Aoyama, Minato-ku, Tokyo",
            phone: "+81 3-1234-5678",
            email: "hello@masalazen.jp",
            lunch: "11:30 — 14:30",
            dinner: "17:30 — 22:00",
            closed: "Closed on Tuesdays",
            instagram: "#",
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        description: "",
        address: "",
        phone: "",
        email: "",
        lunch: "",
        dinner: "",
        closed: "",
        instagram: "",
    });

    // Handle input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add
    const handleAdd = () => {
        setFormData({
            description: "",
            address: "",
            phone: "",
            email: "",
            lunch: "",
            dinner: "",
            closed: "",
            instagram: "",
        });
        setEditId(null);
        setShowModal(true);
    };

    // Edit
    const handleEdit = (item) => {
        setFormData(item);
        setEditId(item.id);
        setShowModal(true);
    };

    // Submit
    const handleSubmit = () => {
        if (!formData.description || !formData.address) return;

        if (editId) {
            setFooters(
                footers.map((f) =>
                    f.id === editId ? { ...f, ...formData } : f
                )
            );
        } else {
            const newFooter = {
                id: `FOOT-${String(footers.length + 1).padStart(3, "0")}`,
                ...formData,
            };
            setFooters([...footers, newFooter]);
        }

        setShowModal(false);
    };

    // Delete
    const handleDelete = (id) => {
        if (window.confirm("Delete this footer content?")) {
            setFooters(footers.filter((f) => f.id !== id));
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Footer Section</h1>

                <button
                    onClick={handleAdd}
                    className="bg-black text-white p-3 rounded-full hover:bg-gray-800"
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* Table */}
            <table className="min-w-full bg-white rounded-xl shadow">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Address</th>
                        <th className="px-6 py-3 text-left">Contact</th>
                        <th className="px-6 py-3 text-left">Hours</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {footers.map((f) => (
                        <tr key={f.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-3">{f.id}</td>
                            <td className="px-6 py-3">{f.address}</td>
                            <td className="px-6 py-3">
                                {f.phone} <br /> {f.email}
                            </td>
                            <td className="px-6 py-3">
                                {f.lunch} <br /> {f.dinner}
                            </td>

                            <td className="px-6 py-3 flex gap-3">
                                <button onClick={() => handleEdit(f)}>
                                    <Pencil size={18} className="text-blue-600" />
                                </button>

                                <button onClick={() => handleDelete(f.id)}>
                                    <Trash size={18} className="text-red-600" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative">

                        {/* Close */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-semibold mb-5 text-center">
                            {editId ? "Edit Footer" : "Add Footer"}
                        </h2>

                        <div className="space-y-4">

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-lg"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Address</label>
                                <input
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-lg"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-lg"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-lg"
                                />
                            </div>

                            {/* Hours */}
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    name="lunch"
                                    value={formData.lunch}
                                    onChange={handleChange}
                                    placeholder="Lunch Hours"
                                    className="border p-2 rounded-lg"
                                />
                                <input
                                    name="dinner"
                                    value={formData.dinner}
                                    onChange={handleChange}
                                    placeholder="Dinner Hours"
                                    className="border p-2 rounded-lg"
                                />
                            </div>

                            {/* Closed */}
                            <input
                                name="closed"
                                value={formData.closed}
                                onChange={handleChange}
                                placeholder="Closed Days"
                                className="w-full border p-2 rounded-lg"
                            />

                            {/* Instagram */}
                            <input
                                name="instagram"
                                value={formData.instagram}
                                onChange={handleChange}
                                placeholder="Instagram Link"
                                className="w-full border p-2 rounded-lg"
                            />

                            {/* Buttons */}
                            <div className="flex gap-3 pt-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-1/2 border py-2 rounded-lg hover:bg-gray-100"
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

export default AdminFooter;