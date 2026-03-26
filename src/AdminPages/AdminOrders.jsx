import React from "react";

const AdminOrders = () => {
  const orders = [
    {
      id: "ORD-001",
      customer: "Tanaka Yuki",
      items: "Butter Chicken × 2, Naan × 3",
      total: "¥4,040",
      status: "Preparing",
    },
    {
      id: "ORD-002",
      customer: "Sato Kenji",
      items: "Chicken Biryani × 1, Mango Lassi × 2",
      total: "¥2,750",
      status: "Pending",
    },
    {
      id: "ORD-003",
      customer: "Yamamoto Aiko",
      items: "Palak Paneer × 1, Samosa × 4",
      total: "¥3,170",
      status: "Delivered",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "Preparing") return "bg-blue-100 text-blue-600";
    if (status === "Pending") return "bg-yellow-100 text-yellow-600";
    if (status === "Delivered") return "bg-green-100 text-green-600";
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left">Order</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Items</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o, i) => (
              <tr key={i} className="border-t">
                <td className="px-6 py-4">{o.id}</td>
                <td className="px-6 py-4">{o.customer}</td>
                <td className="px-6 py-4 text-gray-500">{o.items}</td>
                <td className="px-6 py-4">{o.total}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(o.status)}`}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;