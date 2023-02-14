import React, { useState } from "react";
import { useQuery } from "react-query";
import { PageLayoutWrapper } from "../shared/PageLayoutWrapper";
import styled from "styled-components";
import { Paper, Typography } from "@material-ui/core";
import { atMinWidth } from "../../../styles/helpers";
import { theme } from "../../../styles/muiThemes";
import { ProductsTable } from "./ProductsTable";
import { SearchField, useSearchFieldState } from "../shared/SearchField";
import axios from "axios";
import { ProductFilter, Product, Supplier } from "../../utils/types";
import { ProductFilters } from "./ProductFilters";
import { Button } from "../shared/Button";
import { PlusIcon } from "../../../assets/icons/Plus.icon";
import { colors } from "../../../styles/colors";
import { AddNewProduct } from "./AddNewProduct";

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
    const fetchProducts = async () => {
        const response = await axios(`/api/products?${urlParams}`);
        return response.data;
    };

    const queryKey = `/api/products?${urlParams}`;

    const { data: products } = useQuery<Product[]>(queryKey, fetchProducts);

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
                <Typography variant="h1">Products</Typography>

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
