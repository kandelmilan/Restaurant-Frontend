import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash, X } from "lucide-react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/menu";

const AdminMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const [formData, setFormData] = useState({ name: "", price: "", image: "", category: "curry", is_veg: true, spice_level: 1, description: "" });

    const fetchMenuItems = async () => {
        try {
            const res = await axios.get(API_URL);
            setMenuItems(res.data);
        } catch (err) {
            console.error("Failed to fetch menu items:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMenuItems(); }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleAdd = () => {
        setFormData({ name: "", price: "", image: "", category: "curry", is_veg: true, spice_level: 1, description: "" });
        setImageFile(null);
        setEditId(null);
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setFormData({ name: item.name, price: item.price, image: item.image, category: item.category, is_veg: item.is_veg === 1 || item.is_veg === true, spice_level: item.spice_level, description: item.description });
        setImageFile(null);
        setEditId(item.id);
        setShowModal(true);
    };

    const handleSubmit = async () => {
        const form = new FormData();
        form.append("name", formData.name);
        form.append("price", formData.price);
        form.append("category", formData.category);
        form.append("is_veg", formData.is_veg ? "1" : "0");
        form.append("spice_level", formData.spice_level);
        form.append("description", formData.description);
        if (imageFile) { form.append("image", imageFile); } else { form.append("existingImage", formData.image || ""); }
        try {
            if (editId) { await axios.put(`${API_URL}/${editId}`, form); } else { await axios.post(API_URL, form); }
            fetchMenuItems();
            setShowModal(false);
            setImageFile(null);
        } catch (err) {
            console.error("Submit error:", err.response?.data || err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this menu item?")) return;
        try {
            await axios.delete(`${API_URL}/${id}`);
            setMenuItems(menuItems.filter((item) => item.id !== id));
        } catch (err) {
            console.error("Error deleting:", err);
        }
    };

    if (loading) return <p className="p-6 dark:text-gray-300">Loading menu items...</p>;

    const inputClass = "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500";
    const labelClass = "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300";

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Menu Items</h1>
                <button onClick={handleAdd} className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition">
                    <Plus size={20} />
                </button>
            </div>

            {/* Mobile cards */}
            <div className="block md:hidden space-y-4">
                {menuItems.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700 flex gap-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                                <p className="font-semibold text-gray-800 dark:text-white truncate">{item.name}</p>
                                <div className="flex gap-2 ml-2">
                                    <button onClick={() => handleEdit(item)}><Pencil size={16} className="text-blue-500" /></button>
                                    <button onClick={() => handleDelete(item.id)}><Trash size={16} className="text-red-500" /></button>
                                </div>
                            </div>
                            <p className="text-orange-500 font-medium text-sm">{item.price}</p>
                            <div className="flex gap-2 mt-1 flex-wrap">
                                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">{item.category}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${item.is_veg ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                    {item.is_veg ? "Veg" : "Non-Veg"}
                                </span>
                                <span className="text-xs">{"🌶️".repeat(item.spice_level)}</span>
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
                            {["ID", "Image", "Name", "Price", "Category", "Veg/Non-Veg", "Spice", "Actions"].map((h) => (
                                <th key={h} className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {menuItems.map((item) => (
                            <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="px-6 py-3 text-gray-700 dark:text-gray-300">{item.id}</td>
                                <td className="px-6 py-3"><img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" /></td>
                                <td className="px-6 py-3 text-gray-800 dark:text-white">{item.name}</td>
                                <td className="px-6 py-3 text-gray-700 dark:text-gray-300">{item.price}</td>
                                <td className="px-6 py-3 text-gray-700 dark:text-gray-300">{item.category}</td>
                                <td className="px-6 py-3">
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${item.is_veg ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                                        {item.is_veg ? "Veg" : "Non-Veg"}
                                    </span>
                                </td>
                                <td className="px-6 py-3">{"🌶️".repeat(item.spice_level)}</td>
                                <td className="px-6 py-3 flex gap-3">
                                    <button onClick={() => handleEdit(item)}><Pencil size={18} className="text-blue-500" /></button>
                                    <button onClick={() => handleDelete(item.id)}><Trash size={18} className="text-red-500" /></button>
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
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"><X size={20} /></button>
                        <h2 className="text-2xl font-semibold mb-5 text-center text-gray-800 dark:text-white">{editId ? "Edit Item" : "Add Item"}</h2>
                        <div className="space-y-4">
                            <div><label className={labelClass}>Name</label><input name="name" value={formData.name} onChange={handleChange} className={inputClass} /></div>
                            <div><label className={labelClass}>Price</label><input name="price" value={formData.price} onChange={handleChange} className={inputClass} /></div>
                            <div>
                                <label className={labelClass}>Upload Image</label>
                                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700" />
                                {imageFile && <img src={URL.createObjectURL(imageFile)} alt="preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
                                {!imageFile && formData.image && <img src={formData.image} alt="existing" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
                            </div>
                            <div>
                                <label className={labelClass}>Category</label>
                                <select name="category" value={formData.category} onChange={handleChange} className={inputClass}>
                                    {["curry", "tandoor", "starters", "sides", "drinks"].map((cat) => (
                                        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="checkbox" name="is_veg" checked={formData.is_veg} onChange={handleChange} className="w-4 h-4 accent-orange-500" />
                                <label className={labelClass + " mb-0"}>Vegetarian</label>
                            </div>
                            <div>
                                <label className={labelClass}>Spice Level</label>
                                <select name="spice_level" value={formData.spice_level} onChange={handleChange} className={inputClass}>
                                    {[1, 2, 3].map((s) => <option key={s} value={s}>{"🌶️".repeat(s)}</option>)}
                                </select>
                            </div>
                            <div><label className={labelClass}>Description</label><textarea name="description" value={formData.description} onChange={handleChange} className={`${inputClass} resize-none`} rows={3} /></div>
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

export default AdminMenu;