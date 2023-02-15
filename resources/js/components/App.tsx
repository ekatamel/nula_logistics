import React, { useEffect, useState } from "react";
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
import { UserContextProvider } from "./auth/UserContext";

const App = () => {
    const queryClient = new QueryClient();
    const routerAuth = createBrowserRouter(
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
        <>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <UserContextProvider>
                        <SnackProvider>
                            {<RouterProvider router={routerAuth} />}
                        </SnackProvider>
                    </UserContextProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </>
    );
};

export default App;
