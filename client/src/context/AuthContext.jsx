import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const navigate = useNavigate(); // Fix: useNavigate() instead of Navigate
    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );
    const [user, setUser] = useState(null); // Add user state

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
            // Clear token from localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            
            // Clear state
            setToken(null);
            setUser(null);
            
            // Dispatch custom event to notify other components
            window.dispatchEvent(new CustomEvent('authChange', { 
                detail: { action: 'logout' } 
            }));
            
            // Also dispatch storage event for components listening to storage
            window.dispatchEvent(new Event('storage'));
            
            // Navigate to home or login
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{ 
                token, 
                user, 
                setUser,
                login, 
                logout,
                isAuthenticated: !!token 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;