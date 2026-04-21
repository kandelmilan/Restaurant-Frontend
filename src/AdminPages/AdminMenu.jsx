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

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        category: "curry",
        is_veg: true,
        spice_level: 1,
        description: ""
    });

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
        setFormData({
            name: item.name,
            price: item.price,
            image: item.image,
            category: item.category,
            is_veg: item.is_veg === 1 || item.is_veg === true,
            spice_level: item.spice_level,
            description: item.description
        });
        setImageFile(null);
        setEditId(item.id);
        setShowModal(true);
    };

    const handleCancel = () => setShowModal(false);

    const handleFileChange = (e) => setImageFile(e.target.files[0]);

    const handleSubmit = async () => {
        const form = new FormData();
        form.append("name", formData.name);
        form.append("price", formData.price);
        form.append("category", formData.category);
        form.append("is_veg", formData.is_veg ? "1" : "0");
        form.append("spice_level", formData.spice_level);
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

    if (loading) return <p className="p-6">Loading menu items...</p>;

    // Keep your exact same JSX return, just update the image field in modal:
    // Replace the Image URL input with file upload (same pattern as AdminHero):
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Menu Items</h1>
                <button onClick={handleAdd} className="bg-black text-white p-3 rounded-full hover:bg-gray-800">
                    <Plus size={20} />
                </button>
            </div>

            <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Image</th>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Price</th>
                        <th className="px-6 py-3 text-left">Category</th>
                        <th className="px-6 py-3 text-left">Veg/Non-Veg</th>
                        <th className="px-6 py-3 text-left">Spice Level</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-3">{item.id}</td>
                            <td className="px-6 py-3">
                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                            </td>
                            <td className="px-6 py-3">{item.name}</td>
                            <td className="px-6 py-3">{item.price}</td>
                            <td className="px-6 py-3">{item.category}</td>
                            <td className="px-6 py-3">{item.is_veg ? "Veg" : "Non-Veg"}</td>
                            <td className="px-6 py-3">{"🌶️".repeat(item.spice_level)}</td>
                            <td className="px-6 py-3 flex gap-3">
                                <button onClick={() => handleEdit(item)}><Pencil size={18} className="text-blue-600" /></button>
                                <button onClick={() => handleDelete(item.id)}><Trash size={18} className="text-red-600" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
                        <button onClick={handleCancel} className="absolute top-4 right-4 text-gray-500 hover:text-black">
                            <X size={20} />
                        </button>
                        <h2 className="text-2xl font-semibold mb-5 text-center">
                            {editId ? "Edit Menu Item" : "Add Menu Item"}
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Name</label>
                                <input name="name" value={formData.name} onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Price</label>
                                <input name="price" value={formData.price} onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Upload Image</label>
                                <input type="file" accept="image/*" onChange={handleFileChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg" />
                                {imageFile && (
                                    <img src={URL.createObjectURL(imageFile)} alt="preview"
                                        className="mt-2 w-32 h-32 object-cover rounded" />
                                )}
                                {!imageFile && formData.image && (
                                    <img src={formData.image} alt="existing"
                                        className="mt-2 w-32 h-32 object-cover rounded" />
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Category</label>
                                <select name="category" value={formData.category} onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
                                    {["curry", "tandoor", "starters", "sides", "drinks"].map((cat) => (
                                        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Veg / Non-Veg</label>
                                <input type="checkbox" name="is_veg" checked={formData.is_veg} onChange={handleChange} className="mr-2" />
                                Vegetarian
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Spice Level</label>
                                <select name="spice_level" value={formData.spice_level} onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
                                    {[1, 2, 3].map((s) => (
                                        <option key={s} value={s}>{"🌶️".repeat(s)}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none" />
                            </div>
                            <div className="flex gap-3 pt-3">
                                <button onClick={handleCancel} className="w-1/2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100">Cancel</button>
                                <button onClick={handleSubmit} className="w-1/2 bg-black text-white py-2 rounded-lg hover:bg-gray-800">
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

export default AdminMenu;