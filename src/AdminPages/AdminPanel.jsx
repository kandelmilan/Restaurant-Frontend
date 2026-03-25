
import React from "react";
import Navbar from "../components/NavBar";

const AdminPanel = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
                <p>Welcome, Admin! Here you can manage your app.</p>
            </main>
        </div>
    );
};

export default AdminPanel;