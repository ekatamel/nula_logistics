import React from "react";
import {
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
} from "@material-ui/core";
import { TableWarehouseRow } from "./TableWarehouseRow";
import { Supplier, Warehouse } from "../../utils/types";

interface Props {
    warehouses?: Warehouse[];
    suppliers?: Supplier[];
    queryKey: string;
}

export const WarehousesTable = ({ warehouses, queryKey, suppliers }: Props) => {
    const areNoWarehouses = !warehouses || warehouses?.length === 0;
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Supplier</TableCell>
                        <TableCell>Products</TableCell>
                        <TableCell>Products quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {areNoWarehouses && (
                        <TableRow>
                            <TableCell>
                                No warehouses fulfill applied filters.
                            </TableCell>
                        </TableRow>
                    )}
                    {warehouses?.map((warehouse) => (
                        <TableWarehouseRow
                            key={warehouse?.id}
                            warehouse={warehouse}
                            queryKey={queryKey}
                            suppliers={suppliers}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
