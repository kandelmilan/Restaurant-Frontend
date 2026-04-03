import React, { createContext, useContext, useState } from "react";

//  context outside the component
export const AuthContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
});

export function AuthProvider({ children }) {
    const userData = sessionStorage.getItem("user");
    const [user, setUser] = useState(userData ? JSON.parse(userData) : null);

    const login = (email, password) => {
        if (email === "admin@masalazen.com" && password === "admin123") {
            const mockUser = { id: "1", name: "Admin", role: "admin" };
            sessionStorage.setItem("user", JSON.stringify(mockUser));
            setUser(mockUser);
            return { success: true };
        }
        return { success: false };
    };

    const logout = () => {
        sessionStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


export const useAuth = () => useContext(AuthContext);