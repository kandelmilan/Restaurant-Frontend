import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Pencil, Trash, X } from "lucide-react";

const API = "http://127.0.0.1:8000/api/testimonial";

const AdminTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ rating: 5, text: "", author: "" });

    useEffect(() => { fetchTestimonials(); }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await axios.get(API);
            setTestimonials(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.name === "rating" ? Number(e.target.value) : e.target.value });
    };

    const handleAdd = () => { setFormData({ rating: 5, text: "", author: "" }); setEditId(null); setShowModal(true); };
    const handleEdit = (item) => { setFormData({ rating: item.rating, text: item.text, author: item.author }); setEditId(item.id); setShowModal(true); };

    const handleSubmit = async () => {
        if (!formData.text || !formData.author) return;
        try {
            if (editId) { await axios.put(`${API}/${editId}`, formData); } else { await axios.post(API, formData); }
            fetchTestimonials();
            setShowModal(false);
        } catch (err) {
            console.error("Submit error:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this testimonial?")) return;
        try {
            await axios.delete(`${API}/${id}`);
            fetchTestimonials();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    const inputClass = "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500";
    const labelClass = "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300";

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Testimonials</h1>
                <button onClick={handleAdd} className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition"><Plus size={20} /></button>
            </div>

            {/* Mobile cards */}
            <div className="block md:hidden space-y-4">
                {testimonials.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-white">{item.author}</p>
                                <p className="text-yellow-500 text-sm">{"★".repeat(item.rating)}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(item)}><Pencil size={16} className="text-blue-500" /></button>
                                <button onClick={() => handleDelete(item.id)}><Trash size={16} className="text-red-500" /></button>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{item.text}</p>
                    </div>
                ))}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            {["ID", "Author", "Rating", "Message", "Actions"].map((h) => (
                                <th key={h} className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials.map((item) => (
                            <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{item.id}</td>
                                <td className="px-6 py-3 font-semibold text-gray-800 dark:text-white">{item.author}</td>
                                <td className="px-6 py-3 text-yellow-500">{"★".repeat(item.rating)}</td>
                                <td className="px-6 py-3 text-gray-600 dark:text-gray-400 text-sm max-w-xs truncate">{item.text}</td>
                                <td className="px-6 py-3 flex gap-3">
                                    <button onClick={() => handleEdit(item)}><Pencil size={18} className="text-blue-500" /></button>
                                    <button onClick={() => handleDelete(item.id)}><Trash size={18} className="text-red-500" /></button>
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
                        <h2 className="text-2xl font-semibold mb-5 text-center text-gray-800 dark:text-white">{editId ? "Edit Testimonial" : "Add Testimonial"}</h2>
                        <div className="space-y-4">
                            <div><label className={labelClass}>Author Name</label><input name="author" value={formData.author} onChange={handleChange} className={inputClass} /></div>
                            <div>
                                <label className={labelClass}>Rating</label>
                                <select name="rating" value={formData.rating} onChange={handleChange} className={inputClass}>
                                    {[5, 4, 3, 2, 1].map((s) => <option key={s} value={s}>{s} Stars</option>)}
                                </select>
                            </div>
                            <div><label className={labelClass}>Message</label><textarea name="text" value={formData.text} onChange={handleChange} rows={4} className={`${inputClass} resize-none`} /></div>
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

export default AdminTestimonials;