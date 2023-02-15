import React from "react";
import { Typography, TextField, Dialog } from "@material-ui/core";
import styled from "styled-components";
import { useQueryClient } from "react-query";
import { Formik } from "formik";
import { ContentPaper } from "../shared/ContentPaper";
import { Button } from "../shared/Button";
import { useCustomMutation, Mutation } from "../../utils/useCustomMutation";
import { useQueryNotification } from "../../utils/utils";
import { FormikSubmitHandler, Product } from "../../utils/types";
import { AxiosError } from "axios";

interface Props {
    dialogOpened: boolean;
    setDialogOpened: (dialogOpened: boolean) => void;
}

const initValues = {
    name: "",
    address: "",
    supplier_id: "",
};

export const AddNewSupplier = ({ dialogOpened, setDialogOpened }: Props) => {
    const queryClient = useQueryClient();

    const { successNotification, errorNotification } = useQueryNotification();

    const createNewSubjectMutation: Mutation<Product> = (initVals) => ({
        path: "/api/suppliers",
        method: "POST",
        params: initVals,
    });

    const newSubjectMutation = useCustomMutation(
        createNewSubjectMutation,
        {
            onSuccess: async (data: Record<string, number | any>) => {
                await data.json();
                await queryClient.refetchQueries("/api/suppliers");
                successNotification("New supplier was created!");

                setDialogOpened(false);
            },
            onError: (error: AxiosError) => {
                if (error.status != 422) {
                    errorNotification(
                        "Sorry, something went wrong. Please, try again later"
                    );
                }
            },
        },
        true
    );

    const formikSubmit: FormikSubmitHandler<any> = async (
        values,
        { setErrors }
    ) => {
        await newSubjectMutation.mutateAsync(values).catch((err) => {
            setErrors(err.errors);
        });
    };

    return (
        <Dialog open={dialogOpened} onClose={() => setDialogOpened(false)}>
            <StyledModal>
                <Typography variant={"h3"}>New supplier</Typography>
                <Formik initialValues={initValues} onSubmit={formikSubmit}>
                    {(formikProps) => {
                        const {
                            values,
                            handleChange,
                            touched,
                            errors,
                            resetForm,
                            submitForm,
                        } = formikProps;

                        return (
                            <>
                                <StyledTextField
                                    fullWidth
                                    required={true}
                                    value={values.name}
                                    name="name"
                                    label={"Supplier name"}
                                    placeholder={"Enter supplier name"}
                                    onChange={handleChange}
                                    error={Boolean(errors["name"])}
                                    helperText={<>{errors["name"]?.[0]}</>}
                                />
                                <StyledTextField
                                    fullWidth
                                    required={true}
                                    value={values.address}
                                    name="address"
                                    label={"Adress"}
                                    placeholder={"Enter supplier's address"}
                                    onChange={handleChange}
                                    error={
                                        touched["address"] &&
                                        Boolean(errors["address"])
                                    }
                                    helperText={<>{errors["address"]?.[0]}</>}
                                />

                                <ButtonWrapper>
                                    <Button
                                        kind={"primary"}
                                        onClick={submitForm}
                                    >
                                        Create
                                    </Button>
                                    <Button
                                        kind={"secondary"}
                                        onClick={() => {
                                            resetForm();
                                            setDialogOpened(false);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </ButtonWrapper>
                            </>
                        );
                    }}
                </Formik>
            </StyledModal>
        </Dialog>
    );
};

const StyledTextField = styled(TextField)`
    margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
`;
const StyledModal = styled(ContentPaper)`
    margin: 10px 30px;
`;
