import React, { useMemo, useState } from "react";
import { Typography, TextField, Dialog } from "@material-ui/core";
import styled from "styled-components";
import { useQuery, useQueryClient } from "react-query";
import { Formik, useFormikContext } from "formik";
import { ContentPaper } from "../shared/ContentPaper";
import { Button } from "../shared/Button";
import { useCustomMutation, Mutation } from "../../utils/useCustomMutation";
import {
    getProductsSelectGroup,
    getSupplierSelectGroup,
    useQueryNotification,
} from "../../utils/utils";
import { FormikSubmitHandler, Product, Supplier } from "../../utils/types";
import { FormSelect } from "../shared/FormSelect";
import axios, { AxiosError } from "axios";

interface Props {
    dialogOpened: boolean;
    setDialogOpened: (dialogOpened: boolean) => void;
    warehouseId?: number;
}

const initValues = {
    supplier_id: "",
    product_id: "",
    quantity: "",
};

export const AssignProductToWarehouse = ({
    dialogOpened,
    setDialogOpened,
    warehouseId,
}: Props) => {
    const queryClient = useQueryClient();
    const [chosenSupplierId, setChosenSupplierId] = useState<string>("");

    const fetchSuppliers = async () => {
        const response = await axios(`/api/suppliers`);
        return response.data;
    };
    const { data: suppliers } = useQuery<Supplier[]>(
        `/api/suppliers`,
        fetchSuppliers
    );

    const chosenSupplierProductsSelect = useMemo(() => {
        const chosenSupplier = suppliers?.find(
            (supplier) => supplier.id === Number(chosenSupplierId)
        );
        return getProductsSelectGroup(chosenSupplier?.products);
    }, [chosenSupplierId]);

    const { successNotification, errorNotification } = useQueryNotification();

    const createNewSubjectMutation: Mutation<Product> = (initVals) => ({
        path: `/api/warehouses/${warehouseId}/products`,
        method: "PATCH",
        params: initVals,
    });

    const newSubjectMutation = useCustomMutation(
        createNewSubjectMutation,
        {
            onSuccess: async () => {
                await queryClient.refetchQueries(
                    `/api/warehouses/${warehouseId}`
                );
                successNotification("Product was successfully created!");
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
                <Typography variant={"h3"}>
                    Assign new product to warehouse
                </Typography>
                <Formik initialValues={initValues} onSubmit={formikSubmit}>
                    {(formikProps) => {
                        const {
                            values,
                            handleChange,
                            errors,
                            resetForm,
                            submitForm,
                        } = formikProps;

                        return (
                            <>
                                {suppliers && (
                                    <StyledFormSelect
                                        value={values.supplier_id}
                                        values={
                                            getSupplierSelectGroup(suppliers) ||
                                            []
                                        }
                                        name={`supplier_id`}
                                        label={"Supplier"}
                                        onChange={(
                                            e: React.ChangeEvent<{
                                                name: string;
                                                value: string;
                                            }>
                                        ) => {
                                            e.target.value !==
                                                chosenSupplierId && resetForm();
                                            handleChange(e);
                                            setChosenSupplierId(e.target.value);
                                        }}
                                        required={true}
                                        placeholder={"Select supplier"}
                                    />
                                )}
                                {errors && errors["supplier_id"]?.[0] && (
                                    <StyledError>
                                        The field supplier is required
                                    </StyledError>
                                )}

                                <StyledFormSelect
                                    value={values.product_id}
                                    values={chosenSupplierProductsSelect || []}
                                    name={`product_id`}
                                    label={"Product"}
                                    onChange={handleChange}
                                    required={true}
                                    placeholder={"Select product"}
                                />
                                {errors && errors["product_id"]?.[0] && (
                                    <StyledError>
                                        The field product is required
                                    </StyledError>
                                )}
                                <StyledTextField
                                    fullWidth
                                    required={true}
                                    value={values.quantity}
                                    name="quantity"
                                    label={"Quantity"}
                                    placeholder={"Enter quantity"}
                                    onChange={handleChange}
                                    error={Boolean(errors["quantity"])}
                                    helperText={<>{errors["quantity"]?.[0]}</>}
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

const StyledFormSelect = styled(FormSelect)`
    margin-top: 1.5rem;
`;

const StyledError = styled.p`
    font-family: Tahoma;
    color: #f44336;
    font-size: 14px;
`;
