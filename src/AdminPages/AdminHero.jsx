import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash, X } from "lucide-react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/heroes";

const AdminHero = () => {
    const [heroes, setHeroes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        tagline: "",
        title: "",
        highlight: "",
        description: "",
        image: "",
    });

    // Fetch heroes from backend
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

    useEffect(() => {
        fetchHeroes();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAdd = () => {
        setFormData({ tagline: "", title: "", highlight: "", description: "", image: "" });
        setEditId(null);
        setShowModal(true);
    };

    const handleEdit = (hero) => {
        setFormData(hero);
        setEditId(hero.id);
        setShowModal(true);
    };

    const handleCancel = () => setShowModal(false);

    const handleSubmit = async () => {
        if (!formData.title || !formData.description) return;

        try {
            if (editId) {
                // Update existing hero
                await axios.put(`${API_URL}/${editId}`, formData);
            } else {
                // Add new hero
                await axios.post(API_URL, formData);
            }
            fetchHeroes(); // Refresh list after changes
            setShowModal(false);
        } catch (err) {
            console.error("Error saving hero:", err);
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

    if (loading) return <p className="p-6">Loading heroes...</p>;

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Hero Section</h1>
                <button onClick={handleAdd} className="bg-black text-white p-3 rounded-full hover:bg-gray-800">
                    <Plus size={20} />
                </button>
            </div>

            {/* Hero Table */}
            <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Title</th>
                        <th className="px-6 py-3 text-left">Tagline</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {heroes.map((hero) => (
                        <tr key={hero.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-3">{hero.id}</td>
                            <td className="px-6 py-3">
                                {hero.title} <br />
                                <span className="text-orange-500">{hero.highlight}</span>
                            </td>
                            <td className="px-6 py-3">{hero.tagline}</td>
                            <td className="px-6 py-3 flex gap-3">
                                <button onClick={() => handleEdit(hero)}>
                                    <Pencil size={18} className="text-blue-600" />
                                </button>
                                <button onClick={() => handleDelete(hero.id)}>
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
                        <button onClick={handleCancel} className="absolute top-4 right-4 text-gray-500 hover:text-black">
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-semibold mb-6 text-center">
                            {editId ? "Edit Hero" : "Add Hero"}
                        </h2>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Tagline</label>
                                <input
                                    name="tagline"
                                    value={formData.tagline}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Highlight Text</label>
                                <input
                                    name="highlight"
                                    value={formData.highlight}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Image URL</label>
                                <input
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div className="flex gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="w-1/2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="w-1/2 bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                                >
                                    {editId ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminHero;