const db = require("../config/db");

// Get all orders
const getAllOrders = (callback) => {
    db.query("SELECT * FROM orders ORDER BY id ASC", callback);
};

// Create order
const createOrder = (data, callback) => {
    const sql = `
        INSERT INTO orders (order_id, customer, items, total, status)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [
        data.order_id,
        data.customer,
        data.items,
        data.total,
        data.status
    ], callback);
};

// Update order
const updateOrder = (id, data, callback) => {
    const sql = `
        UPDATE orders SET
        customer=?, items=?, total=?, status=?
        WHERE id=?
    `;
    db.query(sql, [
        data.customer,
        data.items,
        data.total,
        data.status,
        id
    ], callback);
};

// Delete order
const deleteOrder = (id, callback) => {
    db.query("DELETE FROM orders WHERE id=?", [id], callback);
};

module.exports = {
    getAllOrders,
    createOrder,
    updateOrder,
    deleteOrder
};