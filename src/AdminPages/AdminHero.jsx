import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash, X } from "lucide-react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/heroes";

const AdminHero = () => {
    const [heroes, setHeroes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const [formData, setFormData] = useState({ tagline: "", title: "", highlight: "", description: "", image: "" });

    const fetchHeroes = async () => {
        try {
            const res = await axios.get(API_URL);
            setHeroes(res.data);
        } catch (err) {
            console.error("Failed to fetch heroes:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchHeroes(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAdd = () => {
        setFormData({ tagline: "", title: "", highlight: "", description: "", image: "" });
        setImageFile(null);
        setEditId(null);
        setShowModal(true);
    };

    const handleEdit = (hero) => {
        setFormData({ tagline: hero.tagline, title: hero.title, highlight: hero.highlight, description: hero.description, image: hero.image });
        setImageFile(null);
        setEditId(hero.id);
        setShowModal(true);
    };

    const handleSubmit = async () => {
        const form = new FormData();
        form.append("tagline", formData.tagline);
        form.append("title", formData.title);
        form.append("highlight", formData.highlight);
        form.append("description", formData.description);
        if (imageFile) {
            form.append("image", imageFile);
        } else {
            form.append("existingImage", formData.image || "");
        }
        try {
            if (editId) {
                await axios.put(`${API_URL}/${editId}`, form);
            } else {
                await axios.post(API_URL, form);
            }
            fetchHeroes();
            setShowModal(false);
            setImageFile(null);
        } catch (err) {
            console.error("Submit error:", err.response?.data || err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this hero section?")) return;
        try {
            await axios.delete(`${API_URL}/${id}`);
            setHeroes(heroes.filter((h) => h.id !== id));
        } catch (err) {
            console.error("Error deleting hero:", err);
        }
    };

    if (loading) return <p className="p-6 dark:text-gray-300">Loading heroes...</p>;

    const inputClass = "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500";
    const labelClass = "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300";

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Hero Section</h1>
                <button onClick={handleAdd} className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition">
                    <Plus size={20} />
                </button>
            </div>

            {/* Card list on mobile, table on desktop */}
            <div className="block md:hidden space-y-4">
                {heroes.map((hero) => (
                    <div key={hero.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-white">{hero.title}</p>
                                <p className="text-orange-500 text-sm">{hero.highlight}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{hero.tagline}</p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => handleEdit(hero)}><Pencil size={18} className="text-blue-500" /></button>
                                <button onClick={() => handleDelete(hero.id)}><Trash size={18} className="text-red-500" /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            {["ID", "Title", "Tagline", "Actions"].map((h) => (
                                <th key={h} className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {heroes.map((hero) => (
                            <tr key={hero.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="px-6 py-3 text-gray-700 dark:text-gray-300">{hero.id}</td>
                                <td className="px-6 py-3">
                                    <span className="text-gray-800 dark:text-white">{hero.title}</span><br />
                                    <span className="text-orange-500 text-sm">{hero.highlight}</span>
                                </td>
                                <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{hero.tagline}</td>
                                <td className="px-6 py-3 flex gap-3">
                                    <button onClick={() => handleEdit(hero)}><Pencil size={18} className="text-blue-500" /></button>
                                    <button onClick={() => handleDelete(hero.id)}><Trash size={18} className="text-red-500" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white">
                            <X size={20} />
                        </button>
                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
                            {editId ? "Edit Hero" : "Add Hero"}
                        </h2>
                        <div className="space-y-4">
                            {["tagline", "title", "highlight"].map((field) => (
                                <div key={field}>
                                    <label className={labelClass}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                    <input name={field} value={formData[field]} onChange={handleChange} className={inputClass} />
                                </div>
                            ))}
                            <div>
                                <label className={labelClass}>Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} className={`${inputClass} resize-none`} rows={3} />
                            </div>
                            <div>
                                <label className={labelClass}>Upload Image</label>
                                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])}
                                    className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700" />
                                {imageFile && <img src={URL.createObjectURL(imageFile)} alt="preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
                                {!imageFile && formData.image && <img src={formData.image} alt="existing" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
                            </div>
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

export default AdminHero;