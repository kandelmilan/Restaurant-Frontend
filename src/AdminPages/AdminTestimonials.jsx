import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Pencil, Trash, X } from "lucide-react";

const API = "http://127.0.0.1:8000/api/testimonial";

const AdminTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        rating: 5,
        text: "",
        author: "",
    });

    // ================= FETCH =================
    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await axios.get(API);
            setTestimonials(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    // ================= INPUT =================
    const handleChange = (e) => {
        const value =
            e.target.name === "rating"
                ? Number(e.target.value)
                : e.target.value;

        setFormData({ ...formData, [e.target.name]: value });
    };

    // ================= ADD =================
    const handleAdd = () => {
        setFormData({ rating: 5, text: "", author: "" });
        setEditId(null);
        setShowModal(true);
    };

    // ================= EDIT =================
    const handleEdit = (item) => {
        setFormData({
            rating: item.rating,
            text: item.text,
            author: item.author,
        });
        setEditId(item.id);
        setShowModal(true);
    };

    // ================= SUBMIT =================
    const handleSubmit = async () => {
        if (!formData.text || !formData.author) return;

        try {
            if (editId) {
                // UPDATE
                await axios.put(`${API}/${editId}`, formData);
            } else {
                // CREATE
                await axios.post(API, formData);
            }

            fetchTestimonials();
            setShowModal(false);

        } catch (err) {
            console.error("Submit error:", err);
        }
    };

    // ================= DELETE =================
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this testimonial?")) return;

        try {
            await axios.delete(`${API}/${id}`);
            fetchTestimonials();
        } catch (err) {
            console.error("Delete error:", err);
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