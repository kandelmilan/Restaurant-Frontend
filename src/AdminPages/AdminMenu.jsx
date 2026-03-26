import React from "react";

const menuItems = [
    { id: 1, name: "Butter Chicken", price: "¥1,450" },
    { id: 2, name: "Palak Paneer", price: "¥1,200" },
];

const AdminMenu = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Menu Items</h1>
            <table className="min-w-full bg-white rounded-xl shadow">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map((item) => (
                        <tr key={item.id} className="border-b">
                            <td className="px-6 py-3">{item.id}</td>
                            <td className="px-6 py-3">{item.name}</td>
                            <td className="px-6 py-3">{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminMenu;