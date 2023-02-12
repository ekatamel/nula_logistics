import React, { FC, KeyboardEvent, useState } from "react";
import styled, { css } from "styled-components";
import { UpdatableFormFieldElement } from "./UpdatableFormFieldElement";
import { Formik, FormikErrors, FormikProps, FormikValues } from "formik";
import { FormControl } from "@material-ui/core";
import { Mutation, useCustomMutation } from "../../utils/useCustomMutation";
import { getErrorsString } from "../../utils/utils";
import { FormikSubmitHandler } from "../../utils/types";
import { useQueryClient } from "react-query";
import { useSnackbar } from "notistack";
import { ErrorTooltip } from "./ErrorTooltip";
import { UpdatableField } from "../../utils/types/UpdatableField";

export type UpdatableEntity = {
    id: number;
    data: any;
};

type Props = {
    updatableField: UpdatableField;
    updatePath: string;
    error: string;
    errorsAppeared?: (errors: FormikErrors<any>) => void;
    updatable: boolean;
    noPadding?: boolean;
    queryKey?: string;
};

export const ItemField: FC<Props> = (props) => {
    const {
        updatableField,
        updatePath,
        errorsAppeared,
        error,
        updatable,
        noPadding,
    } = props;
    const realUpdatePath = updatableField.alternatePath || updatePath;

    const [editing, setEditing] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const showPlaceholderText =
        (!editing && !updatableField.keepVisible) || !updatable;

    const queryClient = useQueryClient();

    const createUpdateMutation: Mutation<UpdatableEntity> = (
        updatableEntity: UpdatableEntity
    ) => {
        return {
            path: realUpdatePath,
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                ...updatableEntity.data,
            },
        };
    };

    const updateMutation = useCustomMutation<Response, any, UpdatableEntity>(
        createUpdateMutation,
        {
            onSuccess: async (data, variables) => {
                await data.json();
                await queryClient.refetchQueries(props.queryKey);
                enqueueSnackbar("Updated", {
                    variant: "success",
                    preventDuplicate: true,
                });
            },
            onError: (err, variables, context) => {
                enqueueSnackbar(getErrorsString(err.errors), {
                    variant: "error",
                    title: "Update error",
                    preventDuplicate: true,
                    persist: false,
                });
            },
        },
        true
    );

    const getInitVals = (): {} => {
        const ret = {};
        ret[updatableField.fieldName] = updatableField.defaultValue;
        return ret;
    };

    const handleFormikSubmit: FormikSubmitHandler<any> = async (
        values,
        { resetForm, validateField }
    ) => {
        validateField(values[updatableField.fieldName]);
        const canMutate =
            values[updatableField.fieldName] !== updatableField.defaultValue;
        if (canMutate) {
            const mutationData = { data: values };
            console.log("starting");
            updateMutation
                // @ts-ignore
                .mutateAsync(mutationData)
                .then(() => {
                    console.log("errorsAppeared");
                    errorsAppeared?.({});
                })
                .catch((response) => {
                    console.log("catchingErrors");
                    if ("errors" in response) {
                        resetForm(getInitVals());
                        errorsAppeared?.(response.errors);
                    }
                })
                .finally(() => {
                    console.log("setEditing(false)");
                    setEditing(false);
                });
        } else setEditing(false);
    };

    const handleKeyPressed = async (
        e: KeyboardEvent<HTMLFormElement>,
        formikProps: FormikProps<FormikValues>
    ) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (!getLocalError(formikProps)) {
                await formikProps.submitForm();
            }
        }
    };

    const getLocalError = (formikProps: FormikProps<any>): string => {
        if (error) return error;
        if (updatableField.fieldName in formikProps.errors) {
            return formikProps.errors[updatableField.fieldName] as string;
        } else return "";
    };

    const showFieldElement = () => {
        setEditing(true);
        errorsAppeared?.({});
    };

    return (
        <Formik initialValues={getInitVals()} onSubmit={handleFormikSubmit}>
            {(formikProps) => (
                <form
                    onKeyDown={async (e) =>
                        await handleKeyPressed(e, formikProps)
                    }
                >
                    <ErrorTooltip
                        arrow
                        title={getLocalError(formikProps)}
                        open={!!getLocalError(formikProps)}
                        placement={"left"}
                    >
                        <StyledFormControl
                            fullWidth
                            $nopadding={noPadding ?? false}
                        >
                            {showPlaceholderText && (
                                <StyledValueText
                                    disabled={!updatable}
                                    onClick={showFieldElement}
                                >
                                    {updatableField.getLabel()}
                                </StyledValueText>
                            )}
                            {!showPlaceholderText && (
                                <UpdatableFormFieldElement
                                    updatableField={updatableField}
                                    formikProps={formikProps}
                                    updateField={formikProps.submitForm}
                                    disabled={!updatable}
                                />
                            )}
                        </StyledFormControl>
                    </ErrorTooltip>
                </form>
            )}
        </Formik>
    );
};

const StyledFormControl = styled(FormControl)<{ $nopadding: boolean }>`
    position: relative;
    min-width: 160px;
    ${(props) =>
        props.$nopadding &&
        css`
            margin-left: -10px;
        `}
`;

const StyledValueText = styled.p<{ disabled: boolean }>`
    padding-left: 9px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin: 0;
    transition: 300ms;
    border: 1px solid transparent;
    min-height: 33px;
    ${(props) =>
        !props.disabled &&
        css`
            &:hover {
                cursor: pointer;
                border-color: black;
            }
        `}
`;
