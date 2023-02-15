import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { FormSelect } from "../FormSelect";
import { SelectFieldData } from "../../../utils/types/SelectFieldData";
import { UpdatableFormFieldElementProps } from "../UpdatableFormFieldElement";

export const UpdatableFormSelect: FC<
    UpdatableFormFieldElementProps<SelectFieldData>
> = (props) => {
    const { updatableField, formikProps, updateField } = props;
    const [open, setOpen] = useState(true);
    const values = updatableField.options;
    const value = formikProps.values[updatableField.fieldName] ?? "";
    const handleOnChange = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => {
        formikProps.setFieldValue(updatableField.fieldName, event.target.value);
        updateField();
    };
    const onClose = () => {
        setOpen(false);
        updateField();
    };
    useEffect(() => {
        if (open) {
            formikProps.setFieldError(updatableField.fieldName, undefined);
        }
    }, [open]);
    return (
        <StyledSelect
            name={updatableField.fieldName}
            autoFocus
            open={open}
            label={updatableField.fieldName}
            defaultValue={updatableField.defaultValue}
            values={values}
            customOnChange={handleOnChange}
            value={value}
            onBlur={updateField}
            onClose={onClose}
        />
    );
};

const StyledSelect = styled(FormSelect)`
    .MuiInputBase-root {
        height: 32px;
    }
    label {
        display: none;
    }
    .MuiInputBase-input {
        font-size: 14px;
        height: 32px;
        display: flex;
        align-items: center;
    }
`;
