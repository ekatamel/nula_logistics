import React, { ChangeEvent, FC } from "react";
import { UpdatableFormFieldElementProps } from "../UpdatableFormFieldElement";
import { TextField } from "@material-ui/core";
import styled from "styled-components";
import { TextFieldData } from "../../../utils/types/TextFieldData";

export const UpdatableFormTextField: FC<
    UpdatableFormFieldElementProps<TextFieldData>
> = (props) => {
    const { updatableField, formikProps, updateField } = props;
    const value = formikProps.values[updatableField.fieldName] ?? "";
    const handleOnChange = (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        formikProps.setFieldValue(updatableField.fieldName, event.target.value);
        if (!event.target.validity.valid) {
            formikProps.setFieldError(
                updatableField.fieldName,
                "Field is not valid"
            );
        }
    };
    return (
        <StyledTextField
            fullWidth
            value={value}
            autoFocus
            size={"medium"}
            variant="outlined"
            name={updatableField.fieldName}
            onChange={handleOnChange}
            onBlur={updateField}
            type={updatableField.fieldType}
        />
    );
};

const StyledTextField = styled(TextField)`
    [type="email"] {
        height: 100%;
        background-position: center right;
        background-repeat: no-repeat;
        background-size: contain;
        &:valid {
            background-image: url("data:image/svg+xml,%0A%3Csvg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%2314141F' d='M0 0h36v36H0z'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.714 17.143a1 1 0 0 0-1.428 1.4L16.38 21.7a1 1 0 0 0 1.426.002l5.907-6a1 1 0 1 0-1.426-1.403l-5.192 5.274-2.38-2.43Z' fill='%23fff'/%3E%3C/svg%3E");
        }
        &:invalid {
            background-image: url("data:image/svg+xml,%0A%3Csvg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%2314141F' d='M0 0h36v36H0z'/%3E%3Cpath d='m14.464 14.464 7.071 7.072M14.464 21.535l7.071-7.07' stroke='%23fff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        }
    }
    .MuiInputBase-root {
        height: 32px;
        .MuiOutlinedInput-notchedOutline {
            border-width: 1px !important;
        }
    }
    .MuiInputBase-input {
        font-size: 14px;
    }
`;
