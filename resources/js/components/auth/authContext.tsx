import React from "react";
import { User } from "../../utils/types";

interface Auth {
    signedIn: boolean;
    user: User | null;
}
const authData: Auth = {
    signedIn: false,
    user: null,
};

export const AuthContext = React.createContext({
    authData: { ...authData },
    setAuthData: (val) => {},
});
