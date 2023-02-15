import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
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
import { fetchHelper } from "../utils/apiHelpers";
import { AuthProvider } from "./auth/AuthProvider";
import { PrivateRoutes } from "./auth/PrivateRoutes";
import { AuthUserRoutes } from "./auth/AuthUserRoutes";

const App = () => {
    const token = localStorage.getItem("auth_token");
    const defaultQueryFn = async ({ queryKey }) => {
        if (token) {
            return await fetchHelper(queryKey[0], token);
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

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <SnackProvider>
                    <AuthProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route
                                    element={<PrivateRoutes token={token} />}
                                >
                                    <Route path="/" element={<Dashboard />} />
                                    <Route
                                        path="/products"
                                        element={<ProductPage />}
                                    />
                                    <Route
                                        path="/suppliers"
                                        element={<SupplierPage />}
                                    />
                                    <Route
                                        path="/warehouses"
                                        element={<WarehousePage />}
                                    />
                                    <Route
                                        path="/warehouses/:id"
                                        element={<WarehouseDetailPage />}
                                    />
                                </Route>
                                <Route
                                    element={<AuthUserRoutes token={token} />}
                                >
                                    <Route
                                        path="/register"
                                        element={<Registration />}
                                    />
                                    <Route path="/login" element={<Login />} />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </AuthProvider>
                </SnackProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;
