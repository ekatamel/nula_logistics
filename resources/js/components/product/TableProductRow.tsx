import React from "react";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import { dateFormatter } from "../../utils/formatters";
import { ItemField } from "../shared/ItemField";
import { TextFieldData } from "../../utils/types/TextFieldData";
import { SelectFieldData } from "../../utils/types/SelectFieldData";
import {
    getSupplierSelectGroup,
    useQueryNotification,
} from "../../utils/utils";
import styled from "styled-components";
import ArchiveIcon from "@material-ui/icons/Archive";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { Product, Supplier } from "../../utils/types";

interface Props {
    product: Product;
    queryKey: string;
    suppliers?: Supplier[];
}

export const TableProductRow = ({ product, queryKey, suppliers }: Props) => {
    const queryClient = useQueryClient();
    const { id, name, price, created_at, supplier } = product;
    const { successNotification, errorNotification } = useQueryNotification();

    const parsedDate = dateFormatter(created_at);
    const suppliersSelect = suppliers && getSupplierSelectGroup(suppliers);

    const token = localStorage.getItem("auth_token");

    const deleteProduct = (id: number) => {
        return axios.delete(`/api/products/${id}`, {
            headers: {
                Authorization: token,
            },
        });
    };

    const handleDelete = useMutation(deleteProduct, {
        onSuccess: async () => {
            await queryClient.refetchQueries(queryKey);
            successNotification("Product was deleted!");
        },
        onError: (error: AxiosError) => {
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
                    updatableField={new TextFieldData(name, "name")}
                    updatePath={`/api/products/${id}`}
                    error={""}
                    noPadding={true}
                    updatable={true}
                    queryKey={queryKey}
                />
            </TableCell>
            <TableCell>
                <ItemField
                    updatableField={new TextFieldData(price, "price")}
                    updatePath={`/api/products/${id}`}
                    error={""}
                    noPadding={true}
                    updatable={true}
                    queryKey={queryKey}
                />
            </TableCell>
            {suppliersSelect && (
                <TableCell>
                    <ItemField
                        updatableField={
                            new SelectFieldData(
                                supplier.id,
                                "supplier_id",
                                suppliersSelect
                            )
                        }
                        updatePath={`/api/products/${id}`}
                        error={""}
                        noPadding={true}
                        updatable={true}
                        queryKey={queryKey}
                    />
                </TableCell>
            )}
            <TableCell>{parsedDate}</TableCell>
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
