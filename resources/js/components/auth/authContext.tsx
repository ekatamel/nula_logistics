import React from "react";
import { User } from "../../utils/types";

interface Auth {
    signedIn: boolean;
    user: User | null;
    token: string | null;
}
const authData: Auth = {
    signedIn: false,
    user: null,
    token: null,
};

export const AuthContext = React.createContext({
    authData: { ...authData },
    setAuthData: (val) => {},
});
