import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { PageLayoutWrapper } from "../shared/PageLayoutWrapper";
import styled from "styled-components";
import { Paper, Typography } from "@material-ui/core";
import { atMinWidth } from "../../../styles/helpers";
import { theme } from "../../../styles/muiThemes";
import { ProductsTable } from "./ProductsTable";
import {
    SearchField,
    useSearchFieldState,
    SearchFieldRef,
} from "../shared/SearchField";
import axios from "axios";
import { Filter } from "../../utils/types";
import { ProductFilters } from "./ProductFilters";

export const initialState = {
    name: "",
    priceFrom: "",
    priceTo: "",
    dateAddedFrom: "",
    dateAddedTo: "",
};

export const ProductPage = () => {
    const { searchString, handleFilterChange } = useSearchFieldState();
    const [filters, setFilters] = useState<Filter>(initialState);

    const { name, priceFrom, priceTo, dateAddedFrom, dateAddedTo } = filters;

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

    const { isLoading, data: products } = useQuery<any>(
        `/api/products?${urlParams}`,
        fetchProducts
    );

    return (
        <PageLayoutWrapper>
            <StyledPaper elevation={0}>
                <Typography variant="h3">Products</Typography>
                <SearchField
                    fullWidth
                    name="searchString"
                    onChange={handleFilterChange}
                    placeholder="Search product by name"
                />

                <ProductListContainer>
                    <ProductFilters filters={filters} setFilters={setFilters} />
                    <div>
                        <Typography variant={"overline"}>Products</Typography>
                        {products && (
                            <ProductsTable
                                products={products}
                                isLoading={isLoading}
                            />
                        )}
                    </div>
                </ProductListContainer>
            </StyledPaper>
        </PageLayoutWrapper>
    );
};

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
