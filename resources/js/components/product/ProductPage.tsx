import React, { useState } from "react";
import { useQuery } from "react-query";
import { PageLayoutWrapper } from "../shared/PageLayoutWrapper";
import styled from "styled-components";
import { IconButton, Paper, Tooltip, Typography } from "@material-ui/core";
import { atMinWidth } from "../../../styles/helpers";
import { theme } from "../../../styles/muiThemes";
import { ProductsTable } from "./ProductsTable";
import { SearchField, useSearchFieldState } from "../shared/SearchField";
import { ProductFilter, Product, Supplier } from "../../utils/types";
import { ProductFilters } from "./ProductFilters";
import { Button } from "../shared/Button";
import { PlusIcon } from "../../../assets/icons/Plus.icon";
import { colors } from "../../../styles/colors";
import { AddNewProduct } from "./AddNewProduct";
import InfoIcon from "@mui/icons-material/Info";
import { Layout } from "../layout/Layout";
import { Alert } from "@material-ui/lab";

export const initialState = {
    name: "",
    priceFrom: "",
    priceTo: "",
    dateAddedFrom: "",
    dateAddedTo: "",
};

export const ProductPage = () => {
    const { searchString, handleFilterChange } = useSearchFieldState();
    const [filters, setFilters] = useState<ProductFilter>(initialState);
    const [dialogOpened, setDialogOpened] = useState(false);

    const { priceFrom, priceTo, dateAddedFrom, dateAddedTo } = filters;

    const urlParams = new URLSearchParams({
        name: searchString,
        price_from: priceFrom,
        price_to: priceTo,
        date_added_from: dateAddedFrom,
        date_added_to: dateAddedTo,
    });
    const queryKey = `/api/products?${urlParams}`;

    const { data: products } = useQuery<Product[]>(queryKey);

    const { data: suppliers } = useQuery<Supplier[]>(`/api/suppliers`);

    return (
        <Layout>
            <PageLayoutWrapper>
                <StyledPaper elevation={0}>
                    <Typography variant="h1">Products</Typography>
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
                                type={"text"}
                                onChange={handleFilterChange}
                                placeholder="Search product by name"
                            />
                            <Button
                                kind={"primary"}
                                onClick={() => setDialogOpened(true)}
                                disabled={suppliers?.length === 0}
                            >
                                <PlusIcon color={colors.white} />{" "}
                                <ButtonText>Add new product</ButtonText>
                            </Button>
                        </SearchBlock>

                        <ProductListContainer>
                            <ProductFilters
                                filters={filters}
                                setFilters={setFilters}
                            />
                            <div>
                                <Typography variant={"overline"}>
                                    Products
                                </Typography>
                                <Tooltip title="Product name, price and supplier fields in this table are updatable. Click in the cell to change the value">
                                    <IconButton>
                                        <InfoIcon />
                                    </IconButton>
                                </Tooltip>
                                {products && (
                                    <ProductsTable
                                        products={products}
                                        queryKey={queryKey}
                                        suppliers={suppliers}
                                    />
                                )}
                            </div>
                        </ProductListContainer>
                        <AddNewProduct
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

const ProductListContainer = styled.div`
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
