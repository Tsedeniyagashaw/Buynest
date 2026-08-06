import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const { token } = useContext(AuthContext);
    const location = useLocation();

    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location,
                    message: "Please login to continue."
                }}
            />
        );
    }

    return children;
}

export default ProtectedRoute;