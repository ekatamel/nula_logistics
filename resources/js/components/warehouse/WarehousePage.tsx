import React from "react";
import { useQuery } from "react-query";

export const WarehousePage = () => {
    const fetchWarehouses = async () => {
        const response = await fetch("/api/warehouses");
        return response.json();
    };

    const { isLoading, data: warehouses } = useQuery<any>(
        "/api/warehouses",
        fetchWarehouses
    );

    console.log("warehouses", warehouses);
    return <h1>WarehousePage</h1>;
};
