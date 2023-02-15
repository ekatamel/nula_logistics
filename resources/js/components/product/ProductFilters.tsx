import React, { FC } from "react";
import styled from "styled-components";
import { Button } from "../shared/Button";
import { initialState } from "./ProductPage";
import { ProductFilter } from "../../utils/types";
import { DateFilter } from "../shared/DateFilter";
import { AmountFilter } from "../shared/AmountFilter";
import { theme } from "../../../styles/muiThemes";

type Props = {
    filters: ProductFilter;
    setFilters: (filters: ProductFilter) => void;
};

export const ProductFilters: FC<Props> = ({ filters, setFilters }) => {
    const clearFilters = () => {
        setFilters(initialState);
    };

    return (
        <FilterContainer>
            <DateFilter filters={filters} setFilters={setFilters} />
            <AmountFilter filters={filters} setFilters={setFilters} />
            <StyledButton kind={"primary"} onClick={clearFilters}>
                Clear filters
            </StyledButton>
        </FilterContainer>
    );
};

const FilterContainer = styled.div`
    padding-top: 0.9rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;

    ${theme.breakpoints.up("md")} {
        margin-bottom: 0px;
    }
`;

const StyledButton = styled(Button)`
    width: 100%;
`;
