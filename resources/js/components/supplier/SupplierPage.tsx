import React, { useState } from "react";
import { useQuery } from "react-query";
import { PageLayoutWrapper } from "../shared/PageLayoutWrapper";
import styled from "styled-components";
import { Paper, Typography } from "@material-ui/core";
import { atMinWidth } from "../../../styles/helpers";
import { theme } from "../../../styles/muiThemes";
import { SearchField, useSearchFieldState } from "../shared/SearchField";
import axios from "axios";
import { ProductFilter, Product, Supplier } from "../../utils/types";
import { Button } from "../shared/Button";
import { PlusIcon } from "../../../assets/icons/Plus.icon";
import { colors } from "../../../styles/colors";
import { SuppliersTable } from "./SuppliersTable";
import { AddNewSupplier } from "./AddNewSupplier";

export const initialState = {
    name: "",
    priceFrom: "",
    priceTo: "",
    dateAddedFrom: "",
    dateAddedTo: "",
};

export const SupplierPage = () => {
    const { searchString, handleFilterChange } = useSearchFieldState();
    const [filters, setFilters] = useState<ProductFilter>(initialState);
    const [dialogOpened, setDialogOpened] = useState(false);

    const fetchSuppliers = async () => {
        const response = await axios(`/api/suppliers`);
        return response.data;
    };
    const { isLoading, data: suppliers } = useQuery<Supplier[]>(
        `/api/suppliers`,
        fetchSuppliers
    );

    return (
        <PageLayoutWrapper>
            <StyledPaper elevation={0}>
                <Typography variant="h1">Suppliers</Typography>

                <StyledMainContent>
                    <SearchBlock>
                        <SearchField
                            fullWidth
                            name="searchString"
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
                        <Typography variant={"overline"}>Products</Typography>
                        {suppliers && (
                            <SuppliersTable
                                isLoading={isLoading}
                                suppliers={suppliers}
                            />
                        )}
                    </ProductListContainer>
                    <AddNewSupplier
                        dialogOpened={dialogOpened}
                        setDialogOpened={setDialogOpened}
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
