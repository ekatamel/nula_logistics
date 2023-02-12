import React, { useState } from "react";
import { useQuery } from "react-query";
import { PageLayoutWrapper } from "../shared/PageLayoutWrapper";
import styled from "styled-components";
import { Paper, Typography } from "@material-ui/core";
import { atMinWidth } from "../../../styles/helpers";
import { theme } from "../../../styles/muiThemes";
import { WarehousesTable } from "./WarehousesTable";
import { SearchField, useSearchFieldState } from "../shared/SearchField";
import axios from "axios";
import { Supplier, Warehouse, WarehouseFilter } from "../../utils/types";
import { WarehouseFilters } from "./WarehouseFilters";
import { Button } from "../shared/Button";
import { PlusIcon } from "../../../assets/icons/Plus.icon";
import { colors } from "../../../styles/colors";
import { AddNewWarehouse } from "./AddNewWarehouse";

export const initialState = {
    query: "",
    totalProductsFrom: "",
    totalProductsTo: "",
};

export const WarehousePage = () => {
    const { searchString, handleFilterChange } = useSearchFieldState();
    const [filters, setFilters] = useState<WarehouseFilter>(initialState);
    const [dialogOpened, setDialogOpened] = useState(false);

    const { totalProductsFrom, totalProductsTo } = filters;

    const urlParams = new URLSearchParams({
        query: searchString,
        total_products_from: totalProductsFrom,
        total_products_to: totalProductsTo,
    });
    const fetchWarehouses = async () => {
        const response = await axios(`/api/warehouses?${urlParams}`);
        return response.data;
    };

    const queryKey = `/api/warehouses?${urlParams}`;

    const { isLoading, data: warehouses } = useQuery<Warehouse[]>(
        queryKey,
        fetchWarehouses
    );

    const fetchSuppliers = async () => {
        const response = await axios(`/api/suppliers`);
        return response.data;
    };
    const { data: suppliers } = useQuery<Supplier[]>(
        `/api/suppliers`,
        fetchSuppliers
    );

    return (
        <PageLayoutWrapper>
            <StyledPaper elevation={0}>
                <Typography variant="h1">Warehouses</Typography>

                <StyledMainContent>
                    <SearchBlock>
                        <SearchField
                            fullWidth
                            name="searchString"
                            onChange={handleFilterChange}
                            placeholder="Search warehouse by address or supplier name"
                        />
                        <Button
                            kind={"primary"}
                            onClick={() => setDialogOpened(true)}
                        >
                            <PlusIcon color={colors.white} />{" "}
                            <ButtonText>Add new warehouse</ButtonText>
                        </Button>
                    </SearchBlock>

                    <WarehouseListContainer>
                        <WarehouseFilters
                            filters={filters}
                            setFilters={setFilters}
                        />
                        <div>
                            <Typography variant={"overline"}>
                                Products
                            </Typography>
                            {warehouses && (
                                <WarehousesTable
                                    warehouses={warehouses}
                                    suppliers={suppliers}
                                    isLoading={isLoading}
                                    queryKey={queryKey}
                                />
                            )}
                        </div>
                    </WarehouseListContainer>
                    <AddNewWarehouse
                        dialogOpened={dialogOpened}
                        setDialogOpened={setDialogOpened}
                        queryKey={queryKey}
                        suppliers={suppliers}
                    />
                </StyledMainContent>
            </StyledPaper>
        </PageLayoutWrapper>
    );
};

const StyledMainContent = styled.div`
    margin-top: 2rem;
`;

const StyledPaper = styled(Paper)`
    min-height: 90vh;
    position: relative;
    padding: 16px;

    ${atMinWidth.tablet} {
        padding: 48px 40px;
    }

    ${atMinWidth.desktop} {
        padding: 48px 64px;
    }
`;

const WarehouseListContainer = styled.div`
    padding-top: 2em;
    display: grid;
    gap: 5rem;
    grid-template-columns: 250px 1fr;
    ${theme.breakpoints.between("md", "lg")} {
        grid-template-columns: 160px 1fr;
    }
    ${theme.breakpoints.down("sm")} {
        padding-bottom: 2em;
        display: block;
    }
`;

const ButtonText = styled.span`
    margin-left: 10px;
`;

const SearchBlock = styled.div`
    display: grid;
    justify-content: end;
    grid-template-columns: 1fr;
    gap: 20px;

    ${atMinWidth.tablet} {
        grid-template-columns: 1fr auto;
    }

    ${atMinWidth.custom(1300)} {
        width: 100%;
    }
`;
