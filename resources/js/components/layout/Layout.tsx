import React from "react";
import styled from "styled-components";
import { theme } from "../../../styles/muiThemes";
import { Navigation } from "../navigation/Navigation";

interface Props {
    children: JSX.Element[] | JSX.Element;
}

export const Layout = ({ children }: Props) => {
    return (
        <PageLayout>
            <MainContent>{children}</MainContent>
            <Navigation />
        </PageLayout>
    );
};

const PageLayout = styled.div`
    width: 100vw;
`;

const MainContent = styled.main`
    margin-left: 0px;
    margin-top: 100px;

    ${theme.breakpoints.up("md")} {
        margin-left: 250px;
        margin-top: 50px;
    }
`;
