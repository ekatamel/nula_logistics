import React from "react";
import { TableRow, TableCell, IconButton, Chip } from "@material-ui/core";
import { ItemField } from "../shared/ItemField";
import { TextFieldData } from "../../utils/types/TextFieldData";
import { useQueryNotification } from "../../utils/utils";
import styled from "styled-components";
import ArchiveIcon from "@material-ui/icons/Archive";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Supplier } from "../../utils/types";

interface Props {
    supplier: Supplier;
}

export const TableSupplierRow = ({ supplier }: Props) => {
    const queryClient = useQueryClient();
    const { id, name, address, products } = supplier;
    const { successNotification, errorNotification } = useQueryNotification();

    const deleteProduct = (id: number) => {
        return axios.delete(`/api/suppliers/${id}`);
    };

    const handleDelete = useMutation(deleteProduct, {
        onSuccess: async () => {
            await queryClient.refetchQueries("/api/suppliers");
            successNotification("Supplier was deleted!");
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
                    updatableField={new TextFieldData(name, "name")}
                    updatePath={`/api/suppliers/${id}`}
                    error={""}
                    noPadding={true}
                    updatable={true}
                />
            </TableCell>
            <TableCell>
                <ItemField
                    updatableField={new TextFieldData(address, "price")}
                    updatePath={`/api/suppliers/${id}`}
                    error={""}
                    noPadding={true}
                    updatable={true}
                />
            </TableCell>
            <TableCell>
                <ChipContainer>
                    {products.map((product) => (
                        <Chip key={product.id} label={product.name} />
                    ))}
                </ChipContainer>
            </TableCell>
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
