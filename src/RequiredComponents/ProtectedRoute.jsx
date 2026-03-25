import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    // Replace this with your real auth check
    const isAuthenticated = localStorage.getItem("isAdmin") === "true";

    if (!isAuthenticated) {
        // Not logged in → redirect to home or login
        return <Navigate to="/admin/login" replace />;
    }


    return children;
};

export default ProtectedRoute;