import { createContext, useState } from "react";
import React from "react";

export const UserContext = createContext<any>(null);

export const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const isLoggedIn = userData ? true : false;

    const handleLogin = (user) => {
        setUserData(user);
    };

    const handleLogout = () => {
        setUserData(null);
    };

    const contextData = {
        userData,
        isLoggedIn,
        handleLogin,
        handleLogout,
    };

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
};
