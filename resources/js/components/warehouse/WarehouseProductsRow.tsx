import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { dateFormatter } from "../../utils/formatters";
import { Product, Supplier } from "../../utils/types";
import { ItemField } from "../shared/ItemField";
import { TextFieldData } from "../../utils/types/TextFieldData";

interface Props {
    product?: Product;
    queryKey: string;
    warehouseId: number;
}

export const WarehouseProductsRow = ({
    product,
    queryKey,
    warehouseId,
}: Props) => {
    const parsedCreatedDate = product && dateFormatter(product.created_at);
    const parsedUpdatedDate = product && dateFormatter(product.updated_at);

    return (
        <TableRow>
            {product && (
                <>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.supplier.name}</TableCell>
                    <TableCell>
                        <ItemField
                            updatableField={
                                new TextFieldData(product.quantity, "quantity")
                            }
                            updatePath={`/api/warehouses/${warehouseId}/products/${product.id}`}
                            error={""}
                            noPadding={true}
                            updatable={true}
                            queryKey={queryKey}
                        />
                    </TableCell>
                    <TableCell>{parsedCreatedDate}</TableCell>
                    <TableCell>{parsedUpdatedDate}</TableCell>
                </>
            )}
        </TableRow>
    );
};
