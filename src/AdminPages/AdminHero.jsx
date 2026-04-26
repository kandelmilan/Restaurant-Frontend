import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash, X } from "lucide-react";
import axios from "axios";

const API = "http://127.0.0.1:8000/api/heroes";

const AdminHero = () => {
    const [heroes, setHeroes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        enTagline: "",
        enTitle: "",
        enHighlight: "",
        enDescription: "",
        jaTagline: "",
        jaTitle: "",
        jaHighlight: "",
        jaDescription: "",
        image: "",
    });

    const fetchHeroes = async () => {
        try {
            const res = await axios.get(`${API}/all`);
            console.log("Fetched heroes:", res.data);
            setHeroes(res.data);
        } catch (err) {
            console.error("Error fetching heroes:", err);
            alert("Error loading heroes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHeroes();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Image selected:", file.name);
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAdd = () => {
        setFormData({
            enTagline: "", enTitle: "", enHighlight: "", enDescription: "",
            jaTagline: "", jaTitle: "", jaHighlight: "", jaDescription: "",
            image: ""
        });
        setImageFile(null);
        setImagePreview("");
        setEditId(null);
        setShowModal(true);
    };

    const handleEdit = async (hero) => {
        try {
            console.log("Editing hero:", hero.id);
            setFormData({
                enTagline: hero.translations?.en?.tagline || "",
                enTitle: hero.translations?.en?.title || "",
                enHighlight: hero.translations?.en?.highlight || "",
                enDescription: hero.translations?.en?.description || "",
                jaTagline: hero.translations?.ja?.tagline || "",
                jaTitle: hero.translations?.ja?.title || "",
                jaHighlight: hero.translations?.ja?.highlight || "",
                jaDescription: hero.translations?.ja?.description || "",
                image: hero.image || ""
            });
            setImagePreview(hero.image || "");
            setImageFile(null);
            setEditId(hero.id);
            setShowModal(true);
        } catch (err) {
            console.error("Error preparing edit:", err);
            alert("Error loading hero details");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        console.log("Form validation check...");
        console.log("enTitle:", formData.enTitle);
        console.log("jaTitle:", formData.jaTitle);
        console.log("imageFile:", imageFile);
        console.log("imagePreview:", imagePreview);
        console.log("editId:", editId);

        if (!formData.enTitle?.trim()) {
            alert("English title is required");
            return;
        }

        if (!formData.jaTitle?.trim()) {
            alert("Japanese title is required");
            return;
        }

        if (!editId && !imageFile) {
            alert("Image is required for new heroes");
            return;
        }

        try {
            setSubmitting(true);
            const form = new FormData();

            // Add text fields
            form.append("enTagline", formData.enTagline?.trim() || "");
            form.append("enTitle", formData.enTitle?.trim() || "");
            form.append("enHighlight", formData.enHighlight?.trim() || "");
            form.append("enDescription", formData.enDescription?.trim() || "");
            form.append("jaTagline", formData.jaTagline?.trim() || "");
            form.append("jaTitle", formData.jaTitle?.trim() || "");
            form.append("jaHighlight", formData.jaHighlight?.trim() || "");
            form.append("jaDescription", formData.jaDescription?.trim() || "");

            // Add image
            if (imageFile) {
                console.log("Adding new image:", imageFile.name);
                form.append("image", imageFile);
            } else if (formData.image) {
                console.log("Using existing image:", formData.image);
                form.append("existingImage", formData.image);
            }

            // Debug: Log FormData contents
            for (let [key, value] of form.entries()) {
                if (value instanceof File) {
                    console.log(`${key}: File(${value.name})`);
                } else {
                    console.log(`${key}: ${value}`);
                }
            }

            if (editId) {
                console.log("Updating hero", editId);
                const response = await axios.put(`${API}/${editId}`, form, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                console.log("Update response:", response.data);
                alert("Hero updated successfully!");
            } else {
                console.log("Creating new hero");
                const response = await axios.post(API, form, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                console.log("Create response:", response.data);
                alert("Hero created successfully!");
            }

            await fetchHeroes();
            setShowModal(false);
            setSubmitting(false);
        } catch (err) {
            console.error("Full error:", err);
            console.error("Error response:", err.response?.data);
            alert(`Error: ${err.response?.data?.error || err.message}`);
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this hero?")) return;
        try {
            await axios.delete(`${API}/${id}`);
            alert("Hero deleted successfully!");
            fetchHeroes();
        } catch (err) {
            console.error("Error deleting hero:", err);
            alert("Error deleting hero");
        }
    };

    if (loading) return <p className="p-6 dark:text-gray-300">Loading...</p>;

    const inputClass = "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm";
    const labelClass = "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300";

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Hero Section</h1>
                <button onClick={handleAdd} className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition">
                    <Plus size={20} />
                </button>
            </div>

            {/* Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Image</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">EN Title</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">JA Title</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {heroes.map((hero) => (
                            <tr key={hero.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="px-6 py-3 text-gray-600 dark:text-gray-400 text-sm">{hero.id}</td>
                                <td className="px-6 py-3">
                                    {hero.image && <img src={hero.image} alt="hero" className="w-12 h-12 rounded object-cover" />}
                                </td>
                                <td className="px-6 py-3 text-gray-800 dark:text-white text-sm">{hero.translations?.en?.title || "—"}</td>
                                <td className="px-6 py-3 text-gray-800 dark:text-white text-sm">{hero.translations?.ja?.title || "—"}</td>
                                <td className="px-6 py-3 flex gap-3">
                                    <button onClick={() => handleEdit(hero)}><Pencil size={18} className="text-blue-500" /></button>
                                    <button onClick={() => handleDelete(hero.id)}><Trash size={18} className="text-red-500" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="block md:hidden space-y-4">
                {heroes.map((hero) => (
                    <div key={hero.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
                        {hero.image && <img src={hero.image} alt="hero" className="w-full h-40 rounded-lg object-cover mb-3" />}
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">EN: {hero.translations?.en?.title || "—"}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">JA: {hero.translations?.ja?.title || "—"}</p>
                        <div className="flex gap-2 mt-3">
                            <button onClick={() => handleEdit(hero)}><Pencil size={16} className="text-blue-500" /></button>
                            <button onClick={() => handleDelete(hero.id)}><Trash size={16} className="text-red-500" /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-4xl rounded-3xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                            disabled={submitting}
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
                            {editId ? "Edit Hero" : "Add Hero"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Image Upload */}
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                                {imagePreview ? (
                                    <div className="relative">
                                        <img src={imagePreview} alt="preview" className="w-full max-h-64 object-cover rounded-lg" />
                                        <button
                                            type="button"
                                            onClick={() => { setImagePreview(""); setImageFile(null); }}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                            disabled={submitting}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-gray-600 dark:text-gray-400 mb-2">Upload Hero Image *</p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            disabled={submitting}
                                            required={!editId}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* English Section */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                                <h3 className="text-lg font-bold mb-4 text-blue-900 dark:text-blue-300">🇬🇧 English Content</h3>

                                <div className="space-y-3">
                                    <div>
                                        <label className={labelClass}>Tagline (EN)</label>
                                        <input
                                            name="enTagline"
                                            value={formData.enTagline}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Where East meets West"
                                            className={inputClass}
                                            disabled={submitting}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>Title (EN) * <span className="text-red-500">Required</span></label>
                                        <input
                                            name="enTitle"
                                            value={formData.enTitle}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Culinary Fusion"
                                            className={inputClass}
                                            disabled={submitting}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>Highlight (EN)</label>
                                        <input
                                            name="enHighlight"
                                            value={formData.enHighlight}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Experience"
                                            className={inputClass}
                                            disabled={submitting}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>Description (EN)</label>
                                        <textarea
                                            name="enDescription"
                                            value={formData.enDescription}
                                            onChange={handleInputChange}
                                            placeholder="Full description..."
                                            rows="3"
                                            className={`${inputClass} resize-none`}
                                            disabled={submitting}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Japanese Section */}
                            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                                <h3 className="text-lg font-bold mb-4 text-red-900 dark:text-red-300">🇯🇵 日本語コンテンツ</h3>

                                <div className="space-y-3">
                                    <div>
                                        <label className={labelClass}>Tagline (JA)</label>
                                        <input
                                            name="jaTagline"
                                            value={formData.jaTagline}
                                            onChange={handleInputChange}
                                            placeholder="例：東と西の出会い"
                                            className={inputClass}
                                            disabled={submitting}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>Title (JA) * <span className="text-red-500">Required</span></label>
                                        <input
                                            name="jaTitle"
                                            value={formData.jaTitle}
                                            onChange={handleInputChange}
                                            placeholder="例：料理の融合"
                                            className={inputClass}
                                            disabled={submitting}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>Highlight (JA)</label>
                                        <input
                                            name="jaHighlight"
                                            value={formData.jaHighlight}
                                            onChange={handleInputChange}
                                            placeholder="例：経験"
                                            className={inputClass}
                                            disabled={submitting}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>Description (JA)</label>
                                        <textarea
                                            name="jaDescription"
                                            value={formData.jaDescription}
                                            onChange={handleInputChange}
                                            placeholder="詳細説明..."
                                            rows="3"
                                            className={`${inputClass} resize-none`}
                                            disabled={submitting}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="w-1/3 border border-gray-300 dark:border-gray-600 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50"
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                            Saving...
                                        </>
                                    ) : (
                                        `${editId ? "Update" : "Add"} Hero`
                                    )}
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