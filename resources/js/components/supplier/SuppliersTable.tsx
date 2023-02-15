import React from "react";
import {
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
} from "@material-ui/core";
import { Supplier } from "../../utils/types";
import { TableSupplierRow } from "./TableSupplierRow";

interface Props {
    suppliers?: Supplier[];
}

export const SuppliersTable = ({ suppliers }: Props) => {
    const areNoSuppliers = !suppliers || suppliers?.length === 0;
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Supplier's name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Products</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {areNoSuppliers && (
                        <TableRow>
                            <TableCell>
                                No suppliers fulfill applied filters.
                            </TableCell>
                        </TableRow>
                    )}
                    {suppliers?.map((supplier: Supplier) => (
                        <TableSupplierRow
                            key={supplier.id}
                            supplier={supplier}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
