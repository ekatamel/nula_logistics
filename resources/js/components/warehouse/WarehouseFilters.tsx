import React, { FC } from "react";
import styled from "styled-components";
import { Button } from "../shared/Button";
import { initialState } from "./WarehousePage";
import { WarehouseFilter } from "../../utils/types";
import { AmountFilter } from "../shared/AmountFilter";
import { theme } from "../../../styles/muiThemes";

type Props = {
    filters: WarehouseFilter;
    setFilters: (filters: WarehouseFilter) => void;
};

export const WarehouseFilters: FC<Props> = ({ filters, setFilters }) => {
    // REPLACE BY BETTER SOLUTION
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
