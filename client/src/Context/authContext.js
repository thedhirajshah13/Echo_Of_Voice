import { createContext, useContext, useState } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuthContext = () => {
    return useContext(AuthContext);
}

// AuthContextProvider component that wraps the app and provides auth context
export const AuthContextProvider = ({ children }) => {
    // Get the initial auth state from localStorage if available
    const [auth, setAuth] = useState(() => {
        const storedUser = localStorage.getItem("blog-user");
        try {
            // Parse the stored user data if it exists, otherwise return null
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.log("Error parsing JSON from localStorage:", error);
            return null;
        }
    });

    // Provide the auth state and setAuth function to the rest of the app
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
