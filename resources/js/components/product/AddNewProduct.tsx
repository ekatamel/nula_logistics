import React from "react";
import { Typography, TextField, Dialog } from "@material-ui/core";
import styled from "styled-components";
import { useQueryClient } from "react-query";
import { Formik } from "formik";
import { ContentPaper } from "../shared/ContentPaper";
import { Button } from "../shared/Button";
import { useCustomMutation, Mutation } from "../../utils/useCustomMutation";
import {
    getSupplierSelectGroup,
    useQueryNotification,
} from "../../utils/utils";
import { FormikSubmitHandler, Product, Supplier } from "../../utils/types";
import { FormSelect } from "../shared/FormSelect";
import { AxiosError } from "axios";

interface Props {
    dialogOpened: boolean;
    setDialogOpened: (dialogOpened: boolean) => void;
    queryKey: string;
    suppliers?: Supplier[];
}

const initValues = {
    name: "",
    price: "",
    supplier_id: "",
};

export const AddNewProduct = ({
    dialogOpened,
    setDialogOpened,
    queryKey,
    suppliers,
}: Props) => {
    const queryClient = useQueryClient();

    const { successNotification, errorNotification } = useQueryNotification();

    const createNewSubjectMutation: Mutation<Product> = (initVals) => ({
        path: "/api/products",
        method: "POST",
        params: initVals,
    });

    const newSubjectMutation = useCustomMutation(
        createNewSubjectMutation,
        {
            onSuccess: async (data: Record<string, number | any>) => {
                await data.json();
                await queryClient.refetchQueries(queryKey);
                successNotification("New product was created!");

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
                <Typography variant={"h3"}>New product</Typography>
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
                                    label={"Product name"}
                                    placeholder={"Enter product name"}
                                    onChange={handleChange}
                                    error={Boolean(errors["name"])}
                                    helperText={<>{errors["name"]?.[0]}</>}
                                />
                                <StyledTextField
                                    fullWidth
                                    required={true}
                                    value={values.price}
                                    name="price"
                                    type={"number"}
                                    label={"Price"}
                                    placeholder={"Enter product price"}
                                    onChange={handleChange}
                                    error={
                                        touched["price"] &&
                                        Boolean(errors["price"])
                                    }
                                    helperText={<>{errors["price"]?.[0]}</>}
                                />

                                <StyledFormSelect
                                    value={values.supplier_id}
                                    values={
                                        getSupplierSelectGroup(suppliers) || []
                                    }
                                    name={`supplier_id`}
                                    label={"Supplier"}
                                    onChange={handleChange}
                                    required={true}
                                />
                                {errors && errors["supplier_id"]?.[0] && (
                                    <StyledError>
                                        The field supplier is required
                                    </StyledError>
                                )}

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

const StyledFormSelect = styled(FormSelect)`
    margin-top: 1.5rem;
`;

const StyledError = styled.p`
    font-family: Tahoma;
    color: #f44336;
    font-size: 14px;
`;
