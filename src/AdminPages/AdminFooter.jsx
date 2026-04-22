import React, { useState } from "react";
import { Plus, Pencil, Trash, X } from "lucide-react";

const AdminFooter = () => {
    const [footers, setFooters] = useState([
        { id: "FOOT-001", description: "Hand-ground spices meet seasonal Japanese produce.", address: "2-14-5 Minami-Aoyama, Minato-ku, Tokyo", phone: "+81 3-1234-5678", email: "hello@masalazen.jp", lunch: "11:30 — 14:30", dinner: "17:30 — 22:00", closed: "Closed on Tuesdays", instagram: "#" },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ description: "", address: "", phone: "", email: "", lunch: "", dinner: "", closed: "", instagram: "" });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAdd = () => {
        setFormData({ description: "", address: "", phone: "", email: "", lunch: "", dinner: "", closed: "", instagram: "" });
        setEditId(null);
        setShowModal(true);
    };

    const handleEdit = (item) => { setFormData(item); setEditId(item.id); setShowModal(true); };

    const handleSubmit = () => {
        if (!formData.description || !formData.address) return;
        if (editId) {
            setFooters(footers.map((f) => f.id === editId ? { ...f, ...formData } : f));
        } else {
            setFooters([...footers, { id: `FOOT-${String(footers.length + 1).padStart(3, "0")}`, ...formData }]);
        }
        setShowModal(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this footer content?")) setFooters(footers.filter((f) => f.id !== id));
    };

    const inputClass = "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500";
    const labelClass = "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300";

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Footer Section</h1>
                <button onClick={handleAdd} className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition"><Plus size={20} /></button>
            </div>

            {/* Mobile cards */}
            <div className="block md:hidden space-y-4">
                {footers.map((f) => (
                    <div key={f.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-xs text-gray-500 dark:text-gray-400">{f.id}</p>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(f)}><Pencil size={16} className="text-blue-500" /></button>
                                <button onClick={() => handleDelete(f.id)}><Trash size={16} className="text-red-500" /></button>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white mb-1">{f.address}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{f.phone}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{f.email}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{f.lunch} · {f.dinner}</p>
                    </div>
                ))}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            {["ID", "Address", "Contact", "Hours", "Actions"].map((h) => (
                                <th key={h} className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {footers.map((f) => (
                            <tr key={f.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="px-6 py-3 text-gray-600 dark:text-gray-400 text-sm">{f.id}</td>
                                <td className="px-6 py-3 text-gray-800 dark:text-white">{f.address}</td>
                                <td className="px-6 py-3 text-gray-600 dark:text-gray-400 text-sm">{f.phone}<br />{f.email}</td>
                                <td className="px-6 py-3 text-gray-600 dark:text-gray-400 text-sm">{f.lunch}<br />{f.dinner}</td>
                                <td className="px-6 py-3 flex gap-3">
                                    <button onClick={() => handleEdit(f)}><Pencil size={18} className="text-blue-500" /></button>
                                    <button onClick={() => handleDelete(f.id)}><Trash size={18} className="text-red-500" /></button>
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
                        <h2 className="text-2xl font-semibold mb-5 text-center text-gray-800 dark:text-white">{editId ? "Edit Footer" : "Add Footer"}</h2>
                        <div className="space-y-4">
                            <div><label className={labelClass}>Description</label><textarea name="description" value={formData.description} onChange={handleChange} className={`${inputClass} resize-none`} rows={3} /></div>
                            <div><label className={labelClass}>Address</label><input name="address" value={formData.address} onChange={handleChange} className={inputClass} /></div>
                            <div><label className={labelClass}>Phone</label><input name="phone" value={formData.phone} onChange={handleChange} className={inputClass} /></div>
                            <div><label className={labelClass}>Email</label><input name="email" value={formData.email} onChange={handleChange} className={inputClass} /></div>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className={labelClass}>Lunch Hours</label><input name="lunch" value={formData.lunch} onChange={handleChange} className={inputClass} /></div>
                                <div><label className={labelClass}>Dinner Hours</label><input name="dinner" value={formData.dinner} onChange={handleChange} className={inputClass} /></div>
                            </div>
                            <div><label className={labelClass}>Closed Days</label><input name="closed" value={formData.closed} onChange={handleChange} className={inputClass} /></div>
                            <div><label className={labelClass}>Instagram Link</label><input name="instagram" value={formData.instagram} onChange={handleChange} className={inputClass} /></div>
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

export default AdminFooter;