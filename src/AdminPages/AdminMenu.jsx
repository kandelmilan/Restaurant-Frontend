import React, { useState } from "react";

const AdminMenu = () => {
    const [items, setItems] = useState([
        { name: "Butter Chicken", price: 1200 },
        { name: "Biryani", price: 900 },
    ]);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const addItem = () => {
        if (!name || !price) return;
        setItems([...items, { name, price }]);
        setName("");
        setPrice("");
    };

    const deleteItem = (index) => {
        const updated = items.filter((_, i) => i !== index);
        setItems(updated);
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold mb-6">Menu Items</h1>

            {/* ADD FORM */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6 flex gap-4">
                <input
                    type="text"
                    placeholder="Item Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-2 border rounded-lg w-full"
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="px-4 py-2 border rounded-lg w-full"
                />

                <button
                    onClick={addItem}
                    className="bg-orange-500 text-white px-6 rounded-lg"
                >
                    Add
                </button>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Price</th>
                            <th className="px-6 py-3 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item, i) => (
                            <tr key={i} className="border-t">
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">¥{item.price}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => deleteItem(i)}
                                        className="text-red-500"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminMenu;