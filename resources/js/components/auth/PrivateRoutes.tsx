import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
    token: string | null;
}

export const PrivateRoutes = ({ token }: Props) => {
    return token ? <Outlet /> : <Navigate to="/login" />;
};
