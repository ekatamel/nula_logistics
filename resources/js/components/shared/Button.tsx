import React from "react";
import { Button as BaseButton, ButtonProps } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../../styles/colors";

const RowButton = styled(BaseButton)`
    font-family: Ginto Normal Regular;
    font-size: "14px";
    text-transform: capitalize;
    line-height: 110%;
`;

const RowButtonSecondary = styled(RowButton)`
    border: 1px solid ${colors.grey0};
    color: ${colors.brand};
`;

const ButtonPrimary = ({ ...rest }) => (
    <BaseButton {...rest} variant="contained" color="primary" />
);
const ButtonSecondary = ({ ...rest }) => (
    <BaseButton {...rest} variant="text" color="primary" />
);
const ButtonBasicPrimary = ({ ...rest }) => (
    <RowButton {...rest} variant="contained" color="primary" />
);
const ButtonBasicSecondary = ({ ...rest }) => (
    <RowButtonSecondary {...rest} variant="text" />
);

export const buttonsToComponents = {
    primary: ButtonPrimary,
    secondary: ButtonSecondary,
    basicPrimary: ButtonBasicPrimary,
    basicSecondary: ButtonBasicSecondary,
};

export type ButtonType = keyof typeof buttonsToComponents;

export type ButtonPropsCustom = {
    kind: ButtonType;
    className?: string;
} & ButtonProps;

export const Button: React.FunctionComponent<ButtonPropsCustom> = (props) => {
    const { kind, ...rest } = props;

    const SelectedButton = buttonsToComponents[kind];

    return <SelectedButton {...rest} />;
};
