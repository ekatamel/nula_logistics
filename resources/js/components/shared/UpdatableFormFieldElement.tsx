import React, { FC } from "react";
import { FormikProps, FormikValues } from "formik";
import { UpdatableFormSelect } from "./formFields/UpdatableFormSelect";
import { UpdatableFormTextField } from "./formFields/UpdatableFormTextField";
import { UpdatableField } from "../../utils/types/UpdatableField";
import { TextFieldData } from "../../utils/types/TextFieldData";
import { SelectFieldData } from "../../utils/types/SelectFieldData";

export type UpdatableFormFieldElementProps<T extends UpdatableField> = {
    updatableField: T;
    formikProps: FormikProps<FormikValues>;
    updateField: () => void;
    onOpen?: () => void;
    disabled?: boolean;
};

export const UpdatableFormFieldElement: FC<
    UpdatableFormFieldElementProps<UpdatableField>
> = (props) => {
    const { updatableField, formikProps, updateField } = props;
    const dataType = updatableField.constructor.name;
    return (
        <div>
            {dataType === TextFieldData.name && (
                <UpdatableFormTextField
                    updateField={updateField}
                    updatableField={updatableField as TextFieldData}
                    formikProps={formikProps}
                />
            )}
            {dataType === SelectFieldData.name && (
                <UpdatableFormSelect
                    updateField={updateField}
                    updatableField={updatableField as SelectFieldData}
                    formikProps={formikProps}
                />
            )}
        </div>
    );
};
