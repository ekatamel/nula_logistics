import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../../../styles/muiThemes";
import { Navigation } from "../navigation/Navigation";
import { useAuth } from "../auth/useAuth";
import { AuthContext } from "../auth/authContext";

interface Props {
    children: JSX.Element[] | JSX.Element;
}

export const Layout = ({ children }: Props) => {
    const { loginUserOnStartup } = useAuth();

    const { authData } = useContext(AuthContext);
    const { userData } = useAuth();

    useEffect(() => {
        const loginIfAuthenticated = async () => {
            const navigateToURL = await loginUserOnStartup();
            // if (navigateToURL) {
            //     window.location.href = navigateToURL;
            // }
        };
        loginIfAuthenticated();
        // console.log("authData", authData);
        console.log("USERDATA", userData);
        console.log("authData", authData);
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
