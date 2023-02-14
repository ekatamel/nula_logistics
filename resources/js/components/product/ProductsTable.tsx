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
import { Product, Supplier } from "../../utils/types";

interface Props {
    products: Product[];
    queryKey: string;
    suppliers?: Supplier[];
}

export const ProductsTable = ({ products, queryKey, suppliers }: Props) => {
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
                        <TableCell>Actions</TableCell>
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
                    {products?.map((product: Product) => (
                        <TableProductRow
                            key={product.id}
                            product={product}
                            queryKey={queryKey}
                            suppliers={suppliers}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
