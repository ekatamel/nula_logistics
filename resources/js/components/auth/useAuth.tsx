import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { redirect } from "react-router";
import { AuthContext } from "./authContext";

interface Auth {
    signedIn: boolean;
    // TODO
    user: any;
    token: string | null;
}

export const useAuth = () => {
    const [userData, setUserdata] = useState<Auth>({
        signedIn: false,
        user: null,
        token: null,
    });

    const { setAuthData } = useContext(AuthContext);

    useEffect(() => {
        setAuthData(userData);
    }, [userData]);

    function setAsLogged(data) {
        const { access_token, user } = data;
        localStorage.setItem("auth_token", `Bearer ${access_token}`);
        setUserdata({ signedIn: true, user, token: access_token });
        return "/";
    }

    const setLogout = () => {
        localStorage.removeItem("auth_token");
        setUserdata({ signedIn: false, user: null, token: null });
        return "/login";
    };

    const loginUserOnStartup = async () => {
        const token = localStorage.getItem("auth_token");

        if (token) {
            try {
                const response = await axios("/api/me", {
                    headers: {
                        Authorization: token,
                    },
                });
                setUserdata({
                    signedIn: true,
                    user: response.data.user,
                    token,
                });
                return "/";
            } catch (err) {
                setUserdata({ signedIn: false, user: null, token: null });
                setLogout();
            }
        } else {
            setUserdata({ signedIn: false, user: null, token: null });
            return "/login";
        }
    };

    return {
        userData,
        setAsLogged,
        setLogout,
        loginUserOnStartup,
    };
};
