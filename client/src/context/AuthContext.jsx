import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const navigate = useNavigate(); 
    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );
    const [user, setUser] = useState(null); 

    const login = (newToken, userData) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        if (userData) {
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
        }
    }

    const logout = async () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            
            setToken(null);
            setUser(null);
            
            window.dispatchEvent(new CustomEvent('authChange', { 
                detail: { action: 'logout' } 
            }));
            
            window.dispatchEvent(new Event('storage'));            
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{  token, user, setUser, login, logout, isAuthenticated: !!token  }} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;