import React from "react";
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

const App = () => {
    const queryClient = new QueryClient();
    const router = createBrowserRouter(
        createRoutesFromElements([
            <Route path="/" element={<Dashboard />} />,
            <Route path="/products" element={<ProductPage />} />,
            <Route path="/suppliers" element={<SupplierPage />} />,
            <Route path="/warehouses" element={<WarehousePage />} />,
        ])
    );

    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <SnackProvider>
                        {<RouterProvider router={router} />}
                    </SnackProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </React.StrictMode>
    );
};

export default App;
