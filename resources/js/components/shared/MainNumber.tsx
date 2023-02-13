import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { theme } from "../../../styles/muiThemes";
import {
    numberWithSpaces,
    roundToTwoFractionalNumbers,
} from "../../utils/utils";

type Props = {
    number: number;
    text: string;
    afterNumberText?: string;
};

export const MainNumber: FC<Props> = (props) => {
    const { afterNumberText, text, number } = props;
    const formattedNumber = useMemo(() => {
        const formatted = roundToTwoFractionalNumbers(number);
        return numberWithSpaces(formatted);
    }, [number]);
    return (
        <>
            <OutlinedNumber>
                {formattedNumber}
                {afterNumberText && (
                    <AfterNumber>{afterNumberText}</AfterNumber>
                )}
            </OutlinedNumber>
            <p>{text}</p>
        </>
    );
};

const OutlinedNumber = styled.p`
    font-size: 4em;
    color: transparent;
    font-weight: 800;
    -webkit-text-stroke: 1px black;
    font-family: "Ginto Nord", serif;
    margin: 54px 0 27px;
    line-height: 0.5;
    ${theme.breakpoints.down("lg")} {
        margin: 30px 0 20px;
        font-size: 3em;
    }
    ${theme.breakpoints.only("md")} {
        line-height: 1;
        margin: 15px 0;
    }
    ${theme.breakpoints.down("sm")} {
        font-size: 2.3em;
    }
`;

const AfterNumber = styled.span`
    font-size: 14px;
    vertical-align: top;
    -webkit-text-stroke-width: 0;
    color: black;
    font-weight: normal;
    font-family: "Ginto Normal Regular", serif;
    padding-left: 0.5em;
    ${theme.breakpoints.down("sm")} {
        font-size: 12px;
        padding-left: 0.4em;
    }
`;
