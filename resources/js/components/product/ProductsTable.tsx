import React, { FC } from "react";
import {
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
} from "@material-ui/core";
import { TableProductRow } from "./TableProductRow";

interface Props {
    products: any;
    isLoading: boolean;
}

export const ProductsTable = ({ products, isLoading }: Props) => {
    const areNoProducts = !products || products?.length === 0;
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Supplier</TableCell>
                        <TableCell>Date added</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {areNoProducts && (
                        <TableRow>
                            <TableCell>
                                No products fulfill applied filters.
                            </TableCell>
                        </TableRow>
                    )}
                    {products?.map((product: any) => (
                        <TableProductRow key={product.id} product={product} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
