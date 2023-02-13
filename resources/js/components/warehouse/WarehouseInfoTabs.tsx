import React from "react";
import { TextFieldData } from "../../utils/types/TextFieldData";
import { UpdatableItemsGroup } from "../shared/formFields/UpdatableItemsGroup";
import { SelectFieldData } from "../../utils/types/SelectFieldData";
import { Product, SelectItem, Supplier, Warehouse } from "../../utils/types";
import styled from "styled-components";
import { Chip } from "@material-ui/core";

interface Props {
    warehouse: Warehouse;
    suppliers: SelectItem[];
}

export const WarehouseInfoTabs = ({ warehouse, suppliers }: Props) => {
    const items = [
        {
            label: "Address",
            updatableFields: [
                new TextFieldData(warehouse.address || "", "address"),
            ],
        },
        {
            label: "Supplier",
            updatableFields: [
                new SelectFieldData(
                    warehouse.supplier.id,
                    "supplier_id",
                    suppliers
                ),
            ],
        },
        {
            label: "Products",
            notUpdatableFields: (
                <ChipContainer>
                    {warehouse.products.map((product: Product) => (
                        <Chip key={product.id} label={product.name} />
                    ))}
                </ChipContainer>
            ),
        },
        {
            label: "Total items",
            notUpdatableFields: warehouse.product_count,
        },
    ];

    return (
        <UpdatableItemsGroup
            items={items}
            updatePaths={[`/api/warehouses/${warehouse.id}`]}
        />
    );
};

const ChipContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
`;
