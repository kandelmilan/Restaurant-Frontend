import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user } = useAuth();

    // Not logged in
    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    // Admin check
    if (adminOnly && user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;