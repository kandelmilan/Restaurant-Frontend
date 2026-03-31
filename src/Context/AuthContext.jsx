import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Verify token on load
    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch("http://localhost:5000/api/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();

                if (res.ok) {
                    setUser(data.user); // { id, name, role }
                } else {
                    localStorage.removeItem("token");
                    setUser(null);
                }
            } catch (error) {
                console.error(error);
                setUser(null);
            }

            setLoading(false);
        };

        verifyUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);