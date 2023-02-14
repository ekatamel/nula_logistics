import React from "react";
import {
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";
import styled, { css } from "styled-components";
import { colors } from "../../../styles/colors";
import { isActive } from "../../utils/utils";
import { items } from "../../utils/navItems";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CategoryIcon from "@material-ui/icons/Category";
import SellIcon from "@mui/icons-material/Sell";
import WarehouseIcon from "@mui/icons-material/Warehouse";

export const NavGroup = () => {
    return (
        <ItemsGroup>
            <List>
                {items.map((item) => (
                    <StyledLink key={item.label} href={item.path}>
                        <MyListItem button $active={isActive(item.path)}>
                            <MyListItemIcon>
                                {item.icon === "dashboard" && <DashboardIcon />}
                                {item.icon === "products" && <CategoryIcon />}
                                {item.icon === "suppliers" && <SellIcon />}
                                {item.icon === "warehouses" && (
                                    <WarehouseIcon />
                                )}
                            </MyListItemIcon>

                            <ItemLabel>{item.label}</ItemLabel>
                        </MyListItem>
                    </StyledLink>
                ))}
            </List>
        </ItemsGroup>
    );
};

const ItemsGroup = styled.div`
    margin-top: 4rem;
`;

const StyledLink = styled(Link)`
    color: inherit !important;
    display: flex;
    align-items: center;
    text-decoration: none !important;
`;

const ItemLabel = styled(ListItemText)`
    > span {
        font-size: 14px;
        letter-spacing: 4px;
    }
`;

const MyListItemActiveState = css`
    color: white !important;
    background-color: #023e8a !important;
    svg path {
        stroke: white;
    }
`;

const MyListItem = styled(ListItem)<{ $active: boolean }>`
    color: ${colors.grey1};
    transition: 300ms;
    font-size: 1em;
    padding: 0.5em 1.5em;
    svg path {
        transition: 300ms;
    }
    ${(props) => props.$active === true && MyListItemActiveState}
    &:hover {
        ${MyListItemActiveState}
    }
`;

const MyListItemIcon = styled(ListItemIcon)`
    min-width: 35px;
`;
