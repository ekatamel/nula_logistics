import React, { useEffect } from "react";
import styled from "styled-components";
import { theme } from "../../../styles/muiThemes";
import { Navigation } from "../navigation/Navigation";
import { useAuth } from "../auth/useAuth";

interface Props {
    children: JSX.Element[] | JSX.Element;
}

export const Layout = ({ children }: Props) => {
    const { loginUserOnStartup } = useAuth();

    useEffect(() => {
        loginUserOnStartup();
    }, []);

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
