import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash, X } from "lucide-react";
import axios from "axios";

const API = "http://127.0.0.1:8000/api/story";

const AdminStory = () => {
    const [stories, setStories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ subtitle: "", title: "", content: "", highlight: "" });

    const fetchStories = async () => {
        try {
            const res = await axios.get(API);
            setStories(res.data);
        } catch (err) {
            console.error("Error fetching stories", err);
        }
    };

    useEffect(() => { fetchStories(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAdd = () => {
        setFormData({ subtitle: "", title: "", content: "", highlight: "" });
        setEditId(null);
        setShowModal(true);
    };

    const handleEdit = (story) => {
        setFormData(story);
        setEditId(story.id);
        setShowModal(true);
    };

    const handleSubmit = async () => {
        try {
            if (editId) { await axios.put(`${API}/${editId}`, formData); } else { await axios.post(API, formData); }
            fetchStories();
            setShowModal(false);
        } catch (err) {
            console.error("Error saving story", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await axios.delete(`${API}/${id}`);
                fetchStories();
            } catch (err) {
                console.error("Error deleting story", err);
            }
        }
    };

    const inputClass = "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500";
    const labelClass = "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300";

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Story Section</h1>
                <button onClick={handleAdd} className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition"><Plus size={20} /></button>
            </div>

            {/* Mobile cards */}
            <div className="block md:hidden space-y-4">
                {stories.map((story) => (
                    <div key={story.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-white">{story.title}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{story.subtitle}</p>
                                <p className="text-xs text-orange-500 mt-1">{story.highlight}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(story)}><Pencil size={16} className="text-blue-500" /></button>
                                <button onClick={() => handleDelete(story.id)}><Trash size={16} className="text-red-500" /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            {["ID", "Title", "Subtitle", "Highlight", "Actions"].map((h) => (
                                <th key={h} className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {stories.map((story) => (
                            <tr key={story.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{story.id}</td>
                                <td className="px-6 py-3 font-semibold text-gray-800 dark:text-white">{story.title}</td>
                                <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{story.subtitle}</td>
                                <td className="px-6 py-3 text-sm text-orange-500">{story.highlight}</td>
                                <td className="px-6 py-3 flex gap-3">
                                    <button onClick={() => handleEdit(story)}><Pencil size={18} className="text-blue-500" /></button>
                                    <button onClick={() => handleDelete(story.id)}><Trash size={18} className="text-red-500" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 dark:text-gray-400"><X size={20} /></button>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{editId ? "Edit Story" : "Add Story"}</h2>
                        <div className="space-y-3">
                            <div><label className={labelClass}>Subtitle</label><input name="subtitle" value={formData.subtitle} onChange={handleChange} className={inputClass} /></div>
                            <div><label className={labelClass}>Title</label><input name="title" value={formData.title} onChange={handleChange} className={inputClass} /></div>
                            <div><label className={labelClass}>Content</label><textarea name="content" value={formData.content} onChange={handleChange} className={`${inputClass} resize-none`} rows={4} /></div>
                            <div><label className={labelClass}>Highlight</label><input name="highlight" value={formData.highlight} onChange={handleChange} className={inputClass} /></div>
                            <div className="flex gap-3 pt-3">
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

export default AdminStory;