

import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem(
        "token"
    ))
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function loadToken() {
            if (!token) {
                setLoading(false)
                return;
            }
        }
        loadToken()
    }, [token])

    const login = (newToken, newUser) => {
        setToken(newToken);
        setUser(newUser)
        localStorage.setItem("token", newToken)
    }

    const logOut = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token")
        navigate("/login")
    }

    const value = { user, token, login, logOut, loading }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}