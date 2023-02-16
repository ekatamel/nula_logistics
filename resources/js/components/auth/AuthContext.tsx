import { createContext, useContext } from "react";

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface AuthContextType {
    userData?: User;
    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => void;
    registerNewUser: (
        name: string,
        email: string,
        password: string
    ) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    userData: undefined,
    loginUser: async (email: string, password: string) => {},
    registerNewUser: async (
        name: string,
        email: string,
        password: string
    ) => {},
    logoutUser: () => {},
});

export const useAuth = () => useContext(AuthContext);
