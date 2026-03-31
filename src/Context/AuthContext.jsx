import React, { createContext, useContext, useState } from "react";

// Simple function to generate random token
const generateToken = () =>
    Math.random().toString(36).substring(2) + Date.now().toString(36);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const userData = localStorage.getItem("user");
    const [user, setUser] = useState(userData ? JSON.parse(userData) : null);

    const login = (email, password) => {
        // Frontend-only check
        if (email === "admin@masalazen.com" && password === "admin123") {
            const mockUser = { id: "1", name: "Admin", role: "admin" };
            const token = generateToken();

            localStorage.setItem("token", token);       // auto token
            localStorage.setItem("user", JSON.stringify(mockUser));

            setUser(mockUser);
            return { success: true, token };
        } else {
            return { success: false, message: "Invalid email or password" };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);