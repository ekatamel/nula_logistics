import React, { FC, useState } from "react";
import styled from "styled-components";
import { FormDatePicker } from "./FormDatePicker";
import { format } from "date-fns";
import { ProductFilter } from "../../utils/types";
import { Typography } from "@material-ui/core";

type Props = {
    filters: ProductFilter;
    setFilters: (filters: ProductFilter) => void;
};

export const DateFilter: FC<Props> = ({ filters, setFilters }) => {
    const [invalidStartDate, setInvalidStartDate] = useState(false);
    const [invalidEndDate, setInvalidEndDate] = useState(false);
    const { dateAddedFrom, dateAddedTo } = filters;

    const handleDateChange = (
        filterName: string,
        date: Date | "Invalid Date" | null
    ) => {
        if (date != "Invalid Date" && date != null) {
            setFilters({
                ...filters,
                [filterName]: format(date, "yyyy-MM-dd"),
            });
            filterName == "dateAddedFrom"
                ? setInvalidStartDate(false)
                : setInvalidEndDate(false);
        } else {
            filterName == "dateAddedFrom"
                ? setInvalidStartDate(true)
                : setInvalidEndDate(true);
        }
    };

    return (
        <StyledDateFilterContainer>
            <div>
                <FormDatePicker
                    fullWidth
                    label={
                        <Typography variant={"overline"}>
                            Date added from
                        </Typography>
                    }
                    onChange={(date) => {
                        handleDateChange("dateAddedFrom", date);
                    }}
                    value={dateAddedFrom ? new Date(dateAddedFrom) : null}
                    error={invalidStartDate}
                    helperText={invalidStartDate && "Invalid date format"}
                />
            </div>

            <div>
                <FormDatePicker
                    fullWidth
                    label={
                        <Typography variant={"overline"}>
                            Date added till
                        </Typography>
                    }
                    onChange={(date) => {
                        handleDateChange("dateAddedTo", date);
                    }}
                    value={dateAddedTo ? new Date(dateAddedTo) : null}
                    error={invalidEndDate}
                    helperText={invalidEndDate && "Invalid date format"}
                />
            </div>
        </StyledDateFilterContainer>
    );
};

const StyledDateFilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
`;
