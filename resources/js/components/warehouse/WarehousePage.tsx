import React, { useState } from "react";
import { useQuery } from "react-query";
import { PageLayoutWrapper } from "../shared/PageLayoutWrapper";
import styled from "styled-components";
import { IconButton, Paper, Tooltip, Typography } from "@material-ui/core";
import { atMinWidth } from "../../../styles/helpers";
import { theme } from "../../../styles/muiThemes";
import { WarehousesTable } from "./WarehousesTable";
import { SearchField, useSearchFieldState } from "../shared/SearchField";
import { Supplier, Warehouse, WarehouseFilter } from "../../utils/types";
import { WarehouseFilters } from "./WarehouseFilters";
import { Button } from "../shared/Button";
import { PlusIcon } from "../../../assets/icons/Plus.icon";
import { colors } from "../../../styles/colors";
import { AddNewWarehouse } from "./AddNewWarehouse";
import InfoIcon from "@mui/icons-material/Info";
import { Alert } from "@material-ui/lab";
import { Layout } from "../layout/Layout";

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

    const queryKey = `/api/warehouses?${urlParams}`;

    const { data: warehouses } = useQuery<Warehouse[] | undefined>(queryKey);

    const { data: suppliers } = useQuery<Supplier[]>(`/api/suppliers`);

    return (
        <Layout>
            <PageLayoutWrapper>
                <StyledPaper elevation={0}>
                    <Typography variant="h1">Warehouses</Typography>
                    {suppliers?.length === 0 && (
                        <StyledAlert severity="warning">
                            You have to create a supplier first to be able to
                            created a product
                        </StyledAlert>
                    )}

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
                                disabled={suppliers?.length === 0}
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
                                    Warehouses
                                </Typography>
                                <Tooltip title="Address, supplier fields in this table are updatable. Click in the cell to change the value or click the warehouse ID to see the detail">
                                    <IconButton>
                                        <InfoIcon />
                                    </IconButton>
                                </Tooltip>
                                {warehouses && (
                                    <WarehousesTable
                                        warehouses={warehouses}
                                        suppliers={suppliers}
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
        </Layout>
    );
};

const StyledAlert = styled(Alert)`
    margin-top: 1rem;
`;

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
