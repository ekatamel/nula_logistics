import { useField } from "formik";
import React, { FC } from "react";
import { SelectProps } from "@material-ui/core/Select/Select";
import { SelectItem } from "../../utils/types";
import { SelectInput } from "./SelectInput";

type Props = SelectProps & {
    name: string;
    values: SelectItem[];
    label?: string;
    placeholder?: string;
    className?: string;
    helperText?: string;
    required?: boolean;
    customOnChange?(
        event: React.ChangeEvent<{ name?: string; value: unknown }>
    ): any;
};

export const FormSelect: FC<Props> = (props) => {
    const {
        label,
        name,
        placeholder,
        customOnChange,
        helperText,
        error,
        required,
        values,
        ...rest
    } = props;
    const [field] = useField(name);
    const { onChange, value, onBlur } = field;

    return (
        <SelectInput
            value={value}
            error={error}
            onBlur={onBlur}
            required={required}
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            onChange={customOnChange || onChange}
            values={values}
            name={name}
            {...rest}
        />
    );
};
