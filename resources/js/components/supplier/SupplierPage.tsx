import React from "react";
import { useQuery } from "react-query";

export const SupplierPage = () => {
    const fetchSuppliers = async () => {
        const response = await fetch("/api/suppliers");
        return response.json();
    };

    const { isLoading, data: suppliers } = useQuery<any>(
        "/api/suppliers",
        fetchSuppliers
    );

    console.log("suppliers", suppliers);

    return <h1>Supplier Page</h1>;
};
