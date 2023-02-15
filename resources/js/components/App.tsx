import React, { useState } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import { ProductPage } from "./product/ProductPage";
import { WarehousePage } from "./warehouse/WarehousePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "../../styles/muiThemes";
import { SnackProvider } from "./shared/SnackProvider";
import { SupplierPage } from "./supplier/SupplierPage";
import { WarehouseDetailPage } from "./warehouse/WarehouseDetailPage";
import { Registration } from "./auth/Registration";
import { Login } from "./auth/Login";
import { useAuth } from "../components/auth/useAuth";
import { AuthContext } from "../components/auth/authContext";
import { fetchHelper } from "../utils/apiHelpers";
import { Layout } from "./layout/Layout";

const App = () => {
    const { userData } = useAuth();
    const [authData, setAuthData] = useState({
        signedIn: userData.signedIn,
        user: userData.user,
        token: userData.token,
    });

    const defaultQueryFn = async ({ queryKey }) => {
        if (authData.token) {
            return await fetchHelper(queryKey[0], authData.token);
        }
    };

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                queryFn: defaultQueryFn,
                refetchOnWindowFocus: false,
            },
        },
    });

    const router = createBrowserRouter(
        createRoutesFromElements([
            <Route path="/" element={<Dashboard />} />,
            <Route path="/products" element={<ProductPage />} />,
            <Route path="/suppliers" element={<SupplierPage />} />,
            <Route path="/warehouses" element={<WarehousePage />} />,
            <Route path="/warehouses/:id" element={<WarehouseDetailPage />} />,
            <Route path="/register" element={<Registration />} />,
            <Route path="/login" element={<Login />} />,
        ])
    );

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={{ authData, setAuthData }}>
                <ThemeProvider theme={theme}>
                    <SnackProvider>
                        <Layout>{<RouterProvider router={router} />}</Layout>
                    </SnackProvider>
                </ThemeProvider>
            </AuthContext.Provider>
        </QueryClientProvider>
    );
};

export default App;
