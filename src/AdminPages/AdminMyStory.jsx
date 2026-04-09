import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash, X } from "lucide-react";
import axios from "axios";

const API = "http://127.0.0.1:8000/api/story";

const AdminStory = () => {
    const [stories, setStories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        subtitle: "",
        title: "",
        content: "",
        highlight: "",
    });

    // ✅ FETCH STORIES
    const fetchStories = async () => {
        try {
            const res = await axios.get(API);
            setStories(res.data);
        } catch (err) {
            console.error("Error fetching stories", err);
        }
    };

    useEffect(() => {
        fetchStories();
    }, []);

    // HANDLE INPUT
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ADD
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

    // EDIT
    const handleEdit = (story) => {
        setFormData(story);
        setEditId(story.id);
        setShowModal(true);
    };

    // ✅ SUBMIT (ADD / UPDATE)
    const handleSubmit = async () => {
        try {
            if (editId) {
                await axios.put(`${API}/${editId}`, formData);
            } else {
                await axios.post(API, formData);
            }

            fetchStories(); // refresh data
            setShowModal(false);
        } catch (err) {
            console.error("Error saving story", err);
        }
    };

    // ✅ DELETE
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

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Story Section</h1>

                <button
                    onClick={handleAdd}
                    className="bg-black text-white p-3 rounded-full"
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
                        <tr key={story.id} className="border-b">
                            <td className="px-6 py-3">{story.id}</td>
                            <td className="px-6 py-3 font-semibold">{story.title}</td>
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
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

                    <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative">

                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-xl font-semibold mb-4">
                            {editId ? "Edit Story" : "Add Story"}
                        </h2>

                        <div className="space-y-3">

                            <input
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                placeholder="Subtitle"
                                className="w-full border p-2 rounded"
                            />

                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Title"
                                className="w-full border p-2 rounded"
                            />

                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Content"
                                className="w-full border p-2 rounded"
                            />

                            <input
                                name="highlight"
                                value={formData.highlight}
                                onChange={handleChange}
                                placeholder="Highlight"
                                className="w-full border p-2 rounded"
                            />

                            <div className="flex gap-3 pt-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-1/2 border p-2 rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSubmit}
                                    className="w-1/2 bg-black text-white p-2 rounded"
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