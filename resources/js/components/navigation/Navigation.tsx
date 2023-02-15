import React, { useContext, useEffect, useState } from "react";
import {
    AppBar,
    IconButton,
    SwipeableDrawer,
    Toolbar,
    useMediaQuery,
    useTheme,
    Paper,
} from "@material-ui/core";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import { theme } from "../../../styles/muiThemes";
import { Button } from "../shared/Button";
import { NavGroup } from "./NavGroup";
import { useNavigate, redirect } from "react-router-dom";
import { useQueryNotification } from "../../utils/utils";
import { useAuth } from "../auth/useAuth";
import { AuthContext } from "../auth/authContext";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

export const Navigation = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const mobileVersion = useMediaQuery(theme.breakpoints.down("sm"));
    const { successNotification, errorNotification } = useQueryNotification();

    const { authData } = useContext(AuthContext);
    const { setLogout } = useAuth();

    const handleLogout = async () => {
        return await axios.post(`/api/logout`, {
            headers: {
                Authorization: authData.token,
            },
        });
    };

    const logoutUser = useMutation(handleLogout, {
        onSuccess: async () => {
            successNotification("You were successfully logged out !");
            setLogout();
            // if (navigateToURL) {
            //     window.location.href = navigateToURL;
            // }
        },
        onError: (error: AxiosError) => {
            if (error.status != 422) {
                errorNotification(
                    "Sorry, something went wrong. Please, try again later"
                );
            }
        },
    });

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <nav>
            <StyledPaper>
                <AppBar position="fixed">
                    <MyToolbar>
                        <Hamburger>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="end"
                                onClick={handleDrawerOpen}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Hamburger>
                    </MyToolbar>
                </AppBar>
            </StyledPaper>
            <StyledDrawer
                anchor={mobileVersion ? "right" : "left"}
                open={mobileVersion ? open : true}
                onClose={handleDrawerClose}
                onOpen={handleDrawerOpen}
                variant={mobileVersion ? "temporary" : "persistent"}
            >
                <DrawerContent>
                    <NavGroup />
                    <LogoutButton
                        fullWidth
                        kind="primary"
                        size={"small"}
                        onClick={() => logoutUser.mutate()}
                    >
                        Sign out
                    </LogoutButton>
                </DrawerContent>
            </StyledDrawer>
        </nav>
    );
};

const MyToolbar = styled(Toolbar)`
    display: grid;
    grid-template-columns: 1fr 20px 1fr;
`;

const Hamburger = styled.div`
    grid-column: 3;
    justify-self: flex-end;
    margin-left: auto;
`;

const StyledDrawer = styled(SwipeableDrawer)`
    width: 200px;
    flex-shrink: 0;
    ${theme.breakpoints.down("sm")} {
        width: unset;
    }
`;
const DrawerContent = styled.div`
    flex-basis: 100%;
    position: relative;
    padding: 32px 0;
    color: white;
    background-color: #01022f;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 250px;
`;

const LogoutButton = styled(Button)`
    color: white;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;

    &:hover {
        color: white;
        background-color: rgba(255, 255, 255, 0.05) !important;
    }
`;

const StyledPaper = styled(Paper)`
    ${theme.breakpoints.up("md")} {
        display: none;
    }
`;
