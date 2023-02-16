import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQueryNotification } from "../../utils/utils";
import { AuthContext, User } from "./AuthContext";

interface Props {
    children: JSX.Element;
}

export const AuthProvider = ({ children }: Props) => {
    const [userData, setUserData] = useState<User>();

    const { errorNotification } = useQueryNotification();

    useEffect(() => {
        const storedToken = localStorage.getItem("auth_token");
        if (storedToken) {
            const getUser = async () => {
                const response = await axios("/api/me", {
                    headers: {
                        Authorization: storedToken,
                    },
                });
                setUserData(response.data.user);
            };
            getUser();
        }
    }, []);

    const registerNewUser = async (
        name: string,
        email: string,
        password: string
    ) => {
        try {
            await axios.post("/api/register", {
                name,
                email,
                password,
            });
            window.location.href = "/login";
        } catch (error) {
            errorNotification("Something went wrong");
        }
    };

    const loginUser = async (email: string, password: string) => {
        try {
            const data = await axios.post("/api/login", { email, password });
            const { access_token, user } = data.data;
            localStorage.setItem("auth_token", `Bearer ${access_token}`);
            setUserData(user);
            window.location.href = "/";
        } catch (error) {
            errorNotification("Something went wrong");
        }
    };

    const logoutUser = () => {
        localStorage.removeItem("auth_token");
        setUserData(undefined);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider
            value={{ userData, loginUser, logoutUser, registerNewUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};
