import React, { FC, memo, useCallback, useMemo } from "react";
import { SelectItem } from "../../utils/types";
import {
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from "@material-ui/core";
import styled from "styled-components";
import { SelectProps } from "@material-ui/core/Select/Select";

type Props = Pick<
    SelectProps,
    | "value"
    | "error"
    | "onChange"
    | "onBlur"
    | "name"
    | "required"
    | "onClose"
    | "defaultValue"
    | "open"
    | "className"
> & {
    values: SelectItem[];
    label?: string;
    placeholder?: string;
    helperText?: string;
};
export const SelectInput: FC<Props> = memo((props) => {
    const resolveDisabled = useCallback((value: string | number) => {
        return value === "disabled";
    }, []);
    const {
        values,
        value,
        helperText,
        name,
        placeholder,
        label,
        required,
        error,
        className,
        onChange,
        ...rest
    } = props;
    const labelId = useMemo(() => `${name}Label`, [name]);
    return (
        <StyledSelectContainer className={className}>
            {label && (
                <InputLabel id={labelId} htmlFor={name} required={required}>
                    {label}
                </InputLabel>
            )}
            <Select
                variant="outlined"
                fullWidth
                value={value}
                onChange={onChange}
                displayEmpty
                name={name}
                labelId={labelId}
                id={name}
                {...rest}
            >
                {placeholder && (
                    <StyledMenuItem value="" disabled>
                        <em>{placeholder}</em>
                    </StyledMenuItem>
                )}
                {values.map(({ value, label }) => (
                    <StyledMenuItem
                        key={value}
                        value={value}
                        disabled={resolveDisabled(value)}
                    >
                        {label}
                    </StyledMenuItem>
                ))}
            </Select>
            {helperText && (
                <FormHelperText error={error}>{helperText}</FormHelperText>
            )}
        </StyledSelectContainer>
    );
});

const StyledSelectContainer = styled.div`
    width: 100%;
    flex-grow: 1;
`;

const StyledMenuItem = styled(MenuItem)`
    display: block;
    padding: 5px 10px;
`;
