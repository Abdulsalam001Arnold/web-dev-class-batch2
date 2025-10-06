

import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const { token, loading } = useContext(UserContext)
    useEffect(() => {
        async function checkAuth() {
            if(!token) {
                setIsAuthenticated(false)
                return;
            }else{
                setIsAuthenticated(true)
            }
        }

        checkAuth()
    }, [])

    if (isAuthenticated === null) return <div>Loading.......</div>

    return isAuthenticated ? children : <Navigate to={"/login"} replace/>
}