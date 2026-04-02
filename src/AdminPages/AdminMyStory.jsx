import React, { useState } from "react";
import { Plus, Pencil, Trash, X } from "lucide-react";

const AdminStory = () => {
    const [stories, setStories] = useState([
        {
            id: "STORY-001",
            subtitle: "Our Journey",
            title: "Our Story",
            content:
                "Born from a shared dream between a spice merchant and a chef...",
            highlight:
                "🕉️ Authentic Spices | 🎌 Japanese Craft | 🌿 Seasonal Produce",
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        subtitle: "",
        title: "",
        content: "",
        highlight: "",
    });

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add new story
    const handleAdd = () => {
        setFormData({
            subtitle: "",
            title: "",
            content: "",
            highlight: "",
        });
        setEditId(null);
        setShowModal(true);
    };

    // Edit story
    const handleEdit = (story) => {
        setFormData(story);
        setEditId(story.id);
        setShowModal(true);
    };

    // Submit (Add / Edit)
    const handleSubmit = () => {
        if (!formData.title || !formData.content) return;

        if (editId) {
            setStories(
                stories.map((s) =>
                    s.id === editId ? { ...s, ...formData } : s
                )
            );
        } else {
            const newStory = {
                id: `STORY-${String(stories.length + 1).padStart(3, "0")}`,
                ...formData,
            };
            setStories([...stories, newStory]);
        }

        setShowModal(false);
    };

    // Delete story
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this story?")) {
            setStories(stories.filter((s) => s.id !== id));
        }
    };

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Story Section</h1>

                <button
                    onClick={handleAdd}
                    className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition"
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* Table */}
            <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Title</th>
                        <th className="px-6 py-3 text-left">Subtitle</th>
                        <th className="px-6 py-3 text-left">Highlight</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {stories.map((story) => (
                        <tr key={story.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-3">{story.id}</td>

                            <td className="px-6 py-3 font-semibold">
                                {story.title}
                            </td>

                            <td className="px-6 py-3">{story.subtitle}</td>

                            <td className="px-6 py-3 text-sm text-gray-600">
                                {story.highlight}
                            </td>

                            <td className="px-6 py-3 flex gap-3">
                                <button onClick={() => handleEdit(story)}>
                                    <Pencil size={18} className="text-blue-600" />
                                </button>

                                <button onClick={() => handleDelete(story.id)}>
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

                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative animate-fadeIn">

                        {/* Close */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black"
                        >
                            <X size={20} />
                        </button>

                        {/* Title */}
                        <h2 className="text-2xl font-semibold mb-5 text-center">
                            {editId ? "Edit Story" : "Add Story"}
                        </h2>

                        {/* Form */}
                        <div className="space-y-4">

                            {/* Subtitle */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Subtitle
                                </label>
                                <input
                                    type="text"
                                    name="subtitle"
                                    value={formData.subtitle}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Content
                                </label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Highlight */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Highlight Text
                                </label>
                                <input
                                    type="text"
                                    name="highlight"
                                    value={formData.highlight}
                                    onChange={handleChange}
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

export default AdminStory;