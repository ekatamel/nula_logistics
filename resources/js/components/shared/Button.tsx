import React from "react";
import { Button as BaseButton, ButtonProps } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../../styles/colors";
// import { ButtonPositive, ButtonNegative } from "./buttons.styles";
// import { History } from "history";
//import LocationDescriptor = History.LocationDescriptor;

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

// const ButtonCTA = ({ ...rest }) => <BaseButton {...rest} variant="contained" color="primary" />;
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

// const ButtonTertiary = ({ ...rest }) => <BaseButton {...rest} variant="text" />;

export const buttonsToComponents = {
    // cta: ButtonCTA,
    primary: ButtonPrimary,
    secondary: ButtonSecondary,
    basicPrimary: ButtonBasicPrimary,
    basicSecondary: ButtonBasicSecondary,
    // tertiary: ButtonTertiary,
    // positive: ButtonPositive,
    // negative: ButtonNegative,
};

export type ButtonType = keyof typeof buttonsToComponents;

// TODO: find better way to handle types
export type ButtonPropsCustom = {
    kind: ButtonType;
    //this till be used for Link
    // component?: React.ElementType;
    // to?: LocationDescriptor;
    className?: string;
} & ButtonProps;

export const Button: React.FunctionComponent<ButtonPropsCustom> = (props) => {
    const { kind, ...rest } = props;

    const SelectedButton = buttonsToComponents[kind];

    return <SelectedButton {...rest} />;
};
