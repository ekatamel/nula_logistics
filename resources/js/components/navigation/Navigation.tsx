import React, { FC, useState } from "react";
import {
    AppBar,
    Hidden,
    IconButton,
    SwipeableDrawer,
    Toolbar,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import styled from "styled-components";
// import { Logo } from "../../components/Icon/icons/Logo.icon";
import { colors } from "../../../styles/colors";
// import { NavGroup, NavGroupProps } from "./components/NavGroup";
import MenuIcon from "@material-ui/icons/Menu";
import { theme } from "../../../styles/muiThemes";
import { Icon } from "../../../assets/icons/Icon";
import { Button } from "../shared/Button";
import { NavGroup } from "./NavGroup";

// type Props = {
//     items: NavGroupProps[];
// };

export const Navigation = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const mobileVersion = useMediaQuery(theme.breakpoints.down("sm"));

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <nav>
            {/* <Hidden mdUp implementation={"css"}>
                <AppBar position="fixed">
                    <MyToolbar>
                        <ToolbarLogo>
                            <a href="/admin/">
                                <Logo />
                            </a>
                        </ToolbarLogo>

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
            </Hidden> */}
            <StyledDrawer
                anchor={mobileVersion ? "right" : "left"}
                open={mobileVersion ? open : true}
                onClose={handleDrawerClose}
                onOpen={handleDrawerOpen}
                variant={mobileVersion ? "temporary" : "persistent"}
            >
                <DrawerContent>
                    {/* <ContentGrid> */}

                    <NavGroup />
                    {/* </ContentGrid> */}

                    {/* <LogoutButton
                        fullWidth
                        kind="primary"
                        href={"/logout"}
                        size={"small"}
                    >
                        Sign out
                    </LogoutButton> */}
                </DrawerContent>
            </StyledDrawer>
        </nav>
    );
};

const MyToolbar = styled(Toolbar)`
    display: grid;
    grid-template-columns: 1fr 20px 1fr;
`;

const ToolbarLogo = styled.div`
    grid-column: 2;
    padding: 11px 0;
`;

const Hamburger = styled.div`
    grid-column: 3;
    justify-self: flex-end;
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

const ContentGrid = styled.div`
    display: grid;
    align-content: start;
    grid-template-columns: 1fr;
    grid-row-gap: 24px;
`;

const LogoutButton = styled(Button)`
    color: white;

    &:hover {
        color: white;
        background-color: rgba(255, 255, 255, 0.05) !important;
    }
`;
