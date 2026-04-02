import React, { useState } from "react";
import { Plus, Pencil, Trash, X } from "lucide-react";

const AdminTestimonials = () => {
    const [testimonials, setTestimonials] = useState([
        {
            id: "TEST-001",
            rating: 5,
            text: "The butter chicken here rivals anything I've had in Delhi.",
            author: "Yuki T.",
        },
        {
            id: "TEST-002",
            rating: 5,
            text: "Authentic Indian flavors with Tokyo elegance.",
            author: "Raj M.",
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        rating: 5,
        text: "",
        author: "",
    });

    // Handle input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add
    const handleAdd = () => {
        setFormData({ rating: 5, text: "", author: "" });
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
        if (!formData.text || !formData.author) return;

        if (editId) {
            setTestimonials(
                testimonials.map((t) =>
                    t.id === editId ? { ...t, ...formData } : t
                )
            );
        } else {
            const newItem = {
                id: `TEST-${String(testimonials.length + 1).padStart(3, "0")}`,
                ...formData,
            };
            setTestimonials([...testimonials, newItem]);
        }

        setShowModal(false);
    };

    // Delete
    const handleDelete = (id) => {
        if (window.confirm("Delete this testimonial?")) {
            setTestimonials(testimonials.filter((t) => t.id !== id));
        }
    };

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Testimonials</h1>

                <button
                    onClick={handleAdd}
                    className="bg-black text-white p-3 rounded-full hover:bg-gray-800"
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* Table */}
            <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Author</th>
                        <th className="px-6 py-3 text-left">Rating</th>
                        <th className="px-6 py-3 text-left">Message</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {testimonials.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-3">{item.id}</td>

                            <td className="px-6 py-3 font-semibold">
                                {item.author}
                            </td>

                            <td className="px-6 py-3 text-yellow-500">
                                {"★".repeat(item.rating)}
                            </td>

                            <td className="px-6 py-3 text-gray-600 text-sm">
                                {item.text}
                            </td>

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

                        <h2 className="text-2xl font-semibold mb-5 text-center">
                            {editId ? "Edit Testimonial" : "Add Testimonial"}
                        </h2>

                        <div className="space-y-4">

                            {/* Author */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Author Name
                                </label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Rating
                                </label>
                                <select
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-black"
                                >
                                    <option value={5}>5 Stars</option>
                                    <option value={4}>4 Stars</option>
                                    <option value={3}>3 Stars</option>
                                    <option value={2}>2 Stars</option>
                                    <option value={1}>1 Star</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Testimonial Message
                                </label>
                                <textarea
                                    name="text"
                                    value={formData.text}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
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

export default AdminTestimonials;