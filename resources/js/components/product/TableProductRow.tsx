import React, { FC } from "react";
import { TableRow, TableCell, Chip } from "@material-ui/core";
import styled from "styled-components";
import { MoneyFormatter, dateFormatter } from "../../utils/formatters";

interface Props {
    product: any;
}

export const TableProductRow = ({ product }: Props) => {
    const { id, name, price, created_at, supplier } = product;
    const supplierName = supplier.name;

    const priceFormatted = new MoneyFormatter("CZK").format(price);
    const parsedDate = dateFormatter(created_at);
    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{priceFormatted}</TableCell>
            <TableCell>{supplierName}</TableCell>
            <TableCell>{parsedDate}</TableCell>
        </TableRow>
    );
};
