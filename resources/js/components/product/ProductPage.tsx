import React from "react";
import { useQuery } from "react-query";

export const ProductPage = () => {
    const { isLoading, data: products } = useQuery<any>("/api/products");

    console.log("products", products);
    return <h1>Product Page</h1>;
};
