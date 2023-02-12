import React, { FC } from "react";
import styled from "styled-components";
import { Button } from "../shared/Button";
import { initialState } from "./ProductPage";
import { Filter } from "../../utils/types";
import { DateFilter } from "../shared/DateFilter";
import { AmountFilter } from "../shared/AmountFilter";

type Props = {
    filters: Filter;
    setFilters: (filters: Filter) => void;
};

export const ProductFilters: FC<Props> = ({ filters, setFilters }) => {
    const clearFilters = () => {
        const inputs = document.querySelectorAll(
            "input"
        ) as NodeListOf<HTMLInputElement>;
        inputs.forEach((input) => {
            input.value = "";
        });
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
`;

const StyledButton = styled(Button)`
    width: 100%;
`;
