import React, { FC } from "react";
import { Paper } from "@material-ui/core";
import styled from "styled-components";
import { theme } from "../../../styles/muiThemes";

type Props = {
    className?: string;
    children: JSX.Element[];
};
export const ContentPaper: FC<Props> = (props) => {
    const { children, className } = props;
    return (
        <ContentBox elevation={0} className={className}>
            {children}
        </ContentBox>
    );
};

const ContentBox = styled(Paper)`
    position: relative;
    padding: 1rem;

    ${theme.breakpoints.up("md")} {
        padding: 1.5rem 1rem;
    }

    ${theme.breakpoints.up("xl")} {
        padding: 3rem;
    }
`;
