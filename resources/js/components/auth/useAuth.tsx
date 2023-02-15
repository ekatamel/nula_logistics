import axios from "axios";
import React, { useContext, useEffect } from "react";
import { redirect } from "react-router-dom";
import { AuthContext } from "./authContext";

export const useAuth = () => {
    const [userData, setUserdata] = React.useState({
        signedIn: false,
        user: null,
    });

    const { setAuthData } = useContext(AuthContext);

    useEffect(() => {
        setAuthData(userData);
    }, [userData.signedIn]);

    function setAsLogged(data) {
        const { access_token, user } = data;

        localStorage.setItem("auth_token", `Bearer ${access_token}`);
        setUserdata({ signedIn: true, user });
    }

    const setLogout = async () => {
        localStorage.removeItem("auth_token");
        setUserdata({ signedIn: false, user: null });
        redirect("/login");
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
                setUserdata({ signedIn: true, user: response.data.user });
                redirect("/");
            } catch (err) {
                setUserdata({ signedIn: false, user: null });
                setLogout();
            }
        } else {
            setUserdata({ signedIn: false, user: null });
            redirect("/login");
        }
    };

    return {
        userData,
        setAsLogged,
        setLogout,
        loginUserOnStartup,
    };
};
