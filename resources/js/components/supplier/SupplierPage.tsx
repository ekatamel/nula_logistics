import React, { useMemo, useState } from "react";
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
    const { searchString, handleFilterChange, compare } = useSearchFieldState();
    const [dialogOpened, setDialogOpened] = useState(false);

    const fetchSuppliers = async () => {
        const response = await axios(`/api/suppliers`);
        return response.data;
    };
    const { isLoading, data: suppliers } = useQuery<Supplier[]>(
        `/api/suppliers`,
        fetchSuppliers
    );

    const filteredSuppliers = useMemo(
        () =>
            searchString
                ? suppliers?.filter((supplier) =>
                      compare([supplier.name, supplier.address])
                  )
                : suppliers,
        [suppliers, searchString]
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
                            placeholder="Search supplier by name or address"
                        />
                        <Button
                            kind={"primary"}
                            onClick={() => setDialogOpened(true)}
                        >
                            <PlusIcon color={colors.white} />{" "}
                            <ButtonText>Add new supplier</ButtonText>
                        </Button>
                    </SearchBlock>
                    {suppliers && (
                        <SuppliersTable
                            isLoading={isLoading}
                            suppliers={filteredSuppliers}
                        />
                    )}
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
