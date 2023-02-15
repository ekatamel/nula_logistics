import React, { useContext, useEffect } from "react";
import { Paper, TextField, Typography } from "@material-ui/core";
import { atMinWidth } from "../../../styles/helpers";
import styled from "styled-components";
import { Formik } from "formik";
import { Button } from "../shared/Button";
import { useCustomMutation, Mutation } from "../../utils/useCustomMutation";
import { useQueryNotification } from "../../utils/utils";
import { FormikSubmitHandler, Product } from "../../utils/types";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { AuthContext } from "../auth/authContext";

const initValues = {
    email: "",
    password: "",
};

export const Login = () => {
    const { successNotification, errorNotification } = useQueryNotification();
    const navigate = useNavigate();

    const { setAsLogged } = useAuth();
    const { authData } = useContext(AuthContext);

    const createNewSubjectMutation: Mutation<Product> = (initVals) => ({
        path: "/api/login",
        method: "POST",
        params: initVals,
    });

    const newSubjectMutation = useCustomMutation(
        createNewSubjectMutation,
        {
            onSuccess: async (data: Record<string, number | any>) => {
                try {
                    const response = await data.json();
                    const navigateToURL = setAsLogged(response);
                    navigateToURL && navigate(navigateToURL);
                    successNotification("You were successfully logged in!");
                } catch (e) {
                    errorNotification("Something went wrong");
                }
            },
            onError: (error: AxiosError) => {
                if (error.status == 401) {
                    return errorNotification("Unauthorized");
                }
                return errorNotification(
                    "Sorry, something went wrong. Please, try again later"
                );
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

    useEffect(() => {
        if (authData.signedIn) {
            navigate("/");
        }
    }, []);

    return (
        <PageWrapper>
            <StyledTypography variant="overline">
                New here? <a href="/register">Sign up</a>
            </StyledTypography>
            <StyledPaper elevation={10}>
                <Typography variant="h1">Log in</Typography>
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
                            <FormContainer>
                                <StyledTextField
                                    fullWidth
                                    required={true}
                                    value={values.email}
                                    name="email"
                                    label={"email"}
                                    type={"email"}
                                    placeholder={"Enter your email"}
                                    onChange={handleChange}
                                    error={Boolean(errors["email"])}
                                    helperText={<>{errors["email"]?.[0]}</>}
                                />
                                <StyledTextField
                                    fullWidth
                                    required={true}
                                    value={values.password}
                                    name="password"
                                    label={"password"}
                                    placeholder={"Enter your password"}
                                    onChange={handleChange}
                                    error={Boolean(errors["password"])}
                                    helperText={<>{errors["password"]?.[0]}</>}
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
                                        Log In
                                    </Button>
                                    <Button
                                        kind={"secondary"}
                                        type="button"
                                        onClick={() => {
                                            resetForm();
                                        }}
                                    >
                                        Clear
                                    </Button>
                                </ButtonWrapper>
                            </FormContainer>
                        );
                    }}
                </Formik>
            </StyledPaper>
        </PageWrapper>
    );
};

const StyledTypography = styled(Typography)`
    padding-right: 3rem;
    padding-top: 1rem;
    display: block;
`;

const PageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: end;
`;

const FormContainer = styled.div`
    margin-top: 2rem;
`;

const StyledPaper = styled(Paper)`
    padding: 16px;
    height: max-content;
    font-family: Tahoma;
    overflow: scroll;
    width: fit-content;
    max-width: 450px;
    text-align: center;
    margin: auto;

    ${atMinWidth.tablet} {
        padding: 48px 3rem;
    }

    ${atMinWidth.desktop} {
        padding: 64px 64px;
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;
`;

const StyledTextField = styled(TextField)`
    margin-bottom: 20px;
`;

const StyledError = styled.p`
    font-family: Tahoma;
    color: #f44336;
    font-size: 14px;
`;
