import React from "react";
import { TableRow, TableCell, IconButton, Chip } from "@material-ui/core";
import { MoneyFormatter, dateFormatter } from "../../utils/formatters";
import { ItemField } from "../shared/ItemField";
import { TextFieldData } from "../../utils/types/TextFieldData";
import { SelectFieldData } from "../../utils/types/SelectFieldData";
import {
    getSupplierSelectGroup,
    useQueryNotification,
} from "../../utils/utils";
import styled from "styled-components";
import ArchiveIcon from "@material-ui/icons/Archive";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { Supplier, Warehouse } from "../../utils/types";

interface Props {
    warehouse: Warehouse;
    suppliers?: Supplier[];
    queryKey: string;
}

export const TableWarehouseRow = ({
    warehouse,
    queryKey,
    suppliers,
}: Props) => {
    const queryClient = useQueryClient();

    const suppliersSelect = suppliers && getSupplierSelectGroup(suppliers);
    const {
        id,
        address,
        supplier,
        products,
        product_count: totalProducts,
    } = warehouse;
    const { successNotification, errorNotification } = useQueryNotification();

    const deleteProduct = (id: number) => {
        return axios.delete(`/api/warehouses/${id}`);
    };

    const handleDelete = useMutation(deleteProduct, {
        onSuccess: async () => {
            await queryClient.refetchQueries(queryKey);
            successNotification("Warehouse was deleted!");
        },
        onError: (error: any) => {
            if (error.status != 422) {
                errorNotification(
                    "Sorry, something went wrong. Please, try again later"
                );
            }
        },
    });

    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>
                <ItemField
                    updatableField={new TextFieldData(address, "address")}
                    updatePath={`/api/warehouses/${id}`}
                    error={""}
                    noPadding={true}
                    updatable={true}
                    queryKey={queryKey}
                />
            </TableCell>
            <TableCell>
                {suppliersSelect && (
                    <ItemField
                        updatableField={
                            new SelectFieldData(
                                supplier.id,
                                "supplier_id",
                                suppliersSelect
                            )
                        }
                        updatePath={`/api/warehouses/${id}`}
                        error={""}
                        noPadding={true}
                        updatable={true}
                        queryKey={queryKey}
                    />
                )}
            </TableCell>
            <TableCell>
                <ChipContainer>
                    {products.map((product) => (
                        <Chip key={product.id} label={product.name} />
                    ))}
                </ChipContainer>
            </TableCell>
            <TableCell>{totalProducts}</TableCell>
            <TableCell>
                <ActionButtons>
                    <IconButton onClick={() => handleDelete.mutate(id)}>
                        <ArchiveIcon color="primary" />
                    </IconButton>
                </ActionButtons>
            </TableCell>
        </TableRow>
    );
};

const ActionButtons = styled.div`
    display: flex;
`;

const ChipContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    max-width: 400px;
`;
