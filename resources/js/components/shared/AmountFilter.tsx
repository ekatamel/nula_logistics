import React, { FC, useCallback } from "react";
import styled from "styled-components";
import { SearchField } from "../shared/SearchField";
import { Typography, debounce } from "@material-ui/core";
import { Filter, SearchInputType } from "../../utils/types";

type Props = {
    filters: Filter;
    setFilters: (filters: Filter) => void;
};

export const AmountFilter: FC<Props> = ({ filters, setFilters }) => {
    const debouncer = useCallback(
        debounce((filter: Filter) => {
            setFilters(filter);
        }, 300),
        []
    );

    const handleAmountChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        debouncer({ ...filters, [event.target.name]: event.target.value });
    };

    return (
        <ProductFiltersContainer>
            <StyledSearchContainer>
                <Typography variant={"overline"}>Amount from</Typography>
                <SearchField
                    type={SearchInputType.number}
                    name="priceFrom"
                    inputProps={{ inputProps: { min: 0 } }}
                    onChange={handleAmountChange}
                />
            </StyledSearchContainer>
            <StyledSearchContainer>
                <Typography variant={"overline"}>Amount to</Typography>
                <SearchField
                    type={SearchInputType.number}
                    name="priceTo"
                    inputProps={{ inputProps: { min: 0 } }}
                    onChange={handleAmountChange}
                />
            </StyledSearchContainer>
        </ProductFiltersContainer>
    );
};

const ProductFiltersContainer = styled.div`
    margin-bottom: 1rem;
`;

const StyledSearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`;
