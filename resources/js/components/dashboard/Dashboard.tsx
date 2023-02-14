import React, { useState } from "react";
import { PageLayoutWrapper } from "../shared/PageLayoutWrapper";
import styled, { css } from "styled-components";
import { makeStyles, Paper, Typography, Divider } from "@material-ui/core";
import { atMinWidth } from "../../../styles/helpers";
import { theme } from "../../../styles/muiThemes";
import PaidIcon from "@mui/icons-material/Paid";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import axios from "axios";
import { useQuery } from "react-query";
import { Button } from "../shared/Button";
import { PlusIcon } from "../../../assets/icons/Plus.icon";
import { colors } from "../../../styles/colors";

// TODO styles
export const Dashboard = () => {
    const useStyles = makeStyles({
        root: {
            backgroundColor: "#F0FBFD",
        },
    });

    const classes = useStyles();

    const fetchSuppliers = async () => {
        const response = await axios(`/api/stats`);
        return response.data;
    };
    const { isLoading, data: statistics } = useQuery<any>(
        `/api/suppliers`,
        fetchSuppliers
    );

    const mostExpensiveProduct = statistics?.most_expensive_product;
    const biggestSuppplier = statistics?.biggest_supplier;
    const mostLoadedWarehouse = statistics?.most_loaded_warehouse;
    const totalProducts = statistics?.total_products;
    const totalSuppliers = statistics?.total_suppliers;
    const totalWarehouses = statistics?.total_warehouses;

    return (
        <PageLayoutWrapper>
            <StyledTypography variant="h1">Hello, Ekaterina!</StyledTypography>
            <Grid>
                <StyledPaper elevation={10} className={classes.root}>
                    <Typography variant="h3">Statistics</Typography>
                    <StatsContainer>
                        <StatsGroup>
                            <PaidIcon
                                sx={{
                                    color: "#0077B6",
                                    width: "50px",
                                    height: "50px",
                                }}
                            />
                            <StyledParagraph $color={"#0077B6"}>
                                {mostExpensiveProduct?.name}
                            </StyledParagraph>
                        </StatsGroup>
                        <StatsGroup>
                            <LocalShippingIcon
                                sx={{
                                    color: "#48CAE4",
                                    width: "50px",
                                    height: "50px",
                                }}
                            />
                            <StyledParagraph $color={"#48CAE4"}>
                                {biggestSuppplier?.name}
                            </StyledParagraph>
                        </StatsGroup>
                        <StatsGroup>
                            <OtherHousesIcon
                                sx={{
                                    color: "#03045E",
                                    width: "50px",
                                    height: "50px",
                                }}
                            />
                            <StyledParagraph $color={"#03045E"}>
                                {mostLoadedWarehouse?.address}
                            </StyledParagraph>
                        </StatsGroup>
                    </StatsContainer>

                    <Divider variant="middle" />

                    <StatsContainer>
                        <StyledParagraph $color={"#0077B6"}>
                            <OutlinedNumber $color={"#0077B6"}>
                                {totalProducts}
                            </OutlinedNumber>
                            total products
                        </StyledParagraph>
                        <StyledParagraph $color={"#48CAE4"}>
                            <OutlinedNumber $color={"#48CAE4"}>
                                {totalSuppliers}
                            </OutlinedNumber>
                            <span>total suppliers</span>
                        </StyledParagraph>
                        <StyledParagraph $color={"#03045E"}>
                            <OutlinedNumber $color={"#03045E"}>
                                {totalWarehouses}
                            </OutlinedNumber>
                            <span>total warehouses</span>
                        </StyledParagraph>
                    </StatsContainer>
                </StyledPaper>
                <StyledPaper elevation={10}>
                    <Typography variant="h3">Shorcuts</Typography>
                    <ButtonsContainer>
                        <Button kind={"primary"}>
                            <PlusIcon color={colors.white} />{" "}
                            <ButtonText>Add new product</ButtonText>
                        </Button>
                        <Button kind={"primary"}>
                            <PlusIcon color={colors.white} />{" "}
                            <ButtonText>Add new supplier</ButtonText>
                        </Button>
                        <Button kind={"primary"}>
                            <PlusIcon color={colors.white} />{" "}
                            <ButtonText>Add new warehouse</ButtonText>
                        </Button>
                        <Button kind={"primary"}>
                            <PlusIcon color={colors.white} />{" "}
                            <ButtonText>Manage warehouses</ButtonText>
                        </Button>
                    </ButtonsContainer>
                </StyledPaper>
            </Grid>
        </PageLayoutWrapper>
    );
};

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1rem;
`;

const ButtonText = styled.span`
    margin-left: 10px;
`;

const OutlinedNumber = styled.span<{ $color: string }>`
    ${(props) => css`
        -webkit-text-stroke: 2px ${props.$color};
    `}
    font-size: 2em;
    color: transparent;
    font-weight: 800;
    // -webkit-text-stroke: 1px #03045e;
    line-height: 0.5;
    ${theme.breakpoints.down("lg")} {
        font-size: 3em;
    }
    ${theme.breakpoints.only("md")} {
        line-height: 1;
    }
    ${theme.breakpoints.down("sm")} {
        font-size: 2.3em;
    }
`;

const StyledParagraph = styled.div<{ $color: string }>`
    ${(props) => css`
        color: ${props.$color};
    `}
    font-size: 30px;
    margin: 0;
    display: flex;
    gap: 2.5rem;
    align-items: center;
`;

const StatsGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`;

const StatsContainer = styled.div`
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const StyledTypography = styled(Typography)`
    ${atMinWidth.tablet} {
        padding-left: 40px;
    }

    ${atMinWidth.desktop} {
        padding-left: 64px;
    }
`;

const Grid = styled.div`
    display: grid;
    grid-gap: 1.5rem;
    grid-template-columns: 1fr;
    grid-template-rows: auto 3fr;
    margin-top: 50px;

    ${atMinWidth.tablet} {
        padding: 48px 40px;
        margin-top: 00px;
    }

    ${atMinWidth.desktop} {
        padding: 48px 64px;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto 1fr;
    }
`;

const StyledPaper = styled(Paper)`
    padding: 16px;
    height: max-content;
    font-family: Tahoma;
    overflow: scroll;
    height: 80%;
    grid-column: span 1;

    ${atMinWidth.tablet} {
        padding: 48px 3rem;
    }
    ${atMinWidth.desktop} {
        padding: 64px 64px;
    }
`;
