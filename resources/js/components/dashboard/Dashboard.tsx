import React, { useContext } from "react";
import { PageLayoutWrapper } from "../shared/PageLayoutWrapper";
import styled, { css } from "styled-components";
import {
    Paper,
    Typography,
    Tooltip,
    IconButton,
    makeStyles,
} from "@material-ui/core";
import { atMinWidth } from "../../../styles/helpers";
import { theme } from "../../../styles/muiThemes";
import PaidIcon from "@mui/icons-material/Paid";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import axios from "axios";
import { useQuery } from "react-query";
import InfoIcon from "@mui/icons-material/Info";
import { Layout } from "../layout/Layout";
import { UserContext } from "../auth/UserContext";

const useStyles = makeStyles(() => ({
    root: {
        marginTop: -20,
    },
}));

export const Dashboard = () => {
    const classes = useStyles();
    const fetchStatistics = async () => {
        const response = await axios(`/api/stats`);
        return response.data;
    };
    const { data: statistics } = useQuery<any>(`/api/stats`, fetchStatistics);

    const { userData } = useContext(UserContext);

    const mostExpensiveProduct = statistics?.most_expensive_product;
    const biggestSuppplier = statistics?.biggest_supplier;
    const mostLoadedWarehouse = statistics?.most_loaded_warehouse;
    const totalProducts = statistics?.total_products;
    const totalSuppliers = statistics?.total_suppliers;
    const totalWarehouses = statistics?.total_warehouses;

    return (
        <Layout>
            <PageLayoutWrapper>
                <StyledTypography variant="h1">
                    {`Hello, ${userData?.name}!`}
                </StyledTypography>
                <Grid>
                    <StyledPaper elevation={10}>
                        <Typography variant="h2">Statistics</Typography>
                        <Stats>
                            {mostExpensiveProduct &&
                                biggestSuppplier &&
                                mostLoadedWarehouse && (
                                    <StatsContainer>
                                        <StatsGroup>
                                            <PaidIcon
                                                sx={{
                                                    color: "#0077B6",
                                                    width: "50px",
                                                    height: "50px",
                                                }}
                                            />
                                            <Paragraph $color={"#0077B6"}>
                                                {mostExpensiveProduct?.name}{" "}
                                                <Tooltip title="The most expensive product in the database">
                                                    <IconButton
                                                        className={classes.root}
                                                    >
                                                        <InfoIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Paragraph>
                                        </StatsGroup>
                                        <StatsGroup>
                                            <LocalShippingIcon
                                                sx={{
                                                    color: "#48CAE4",
                                                    width: "50px",
                                                    height: "50px",
                                                }}
                                            />
                                            <Paragraph $color={"#48CAE4"}>
                                                {biggestSuppplier?.name}
                                                <Tooltip title="Supplier with the largest product count">
                                                    <IconButton
                                                        className={classes.root}
                                                    >
                                                        <InfoIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Paragraph>
                                        </StatsGroup>
                                        <StatsGroup>
                                            <OtherHousesIcon
                                                sx={{
                                                    color: "#03045E",
                                                    width: "50px",
                                                    height: "50px",
                                                }}
                                            />
                                            <Paragraph $color={"#03045E"}>
                                                {mostLoadedWarehouse?.address}
                                                <Tooltip title="The most loaded warehouse">
                                                    <IconButton
                                                        className={classes.root}
                                                    >
                                                        <InfoIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Paragraph>
                                        </StatsGroup>
                                    </StatsContainer>
                                )}
                            <NumberContainer>
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
                            </NumberContainer>
                        </Stats>
                    </StyledPaper>
                </Grid>
            </PageLayoutWrapper>
        </Layout>
    );
};

const OutlinedNumber = styled.span<{ $color: string }>`
    ${(props) => css`
        -webkit-text-stroke: 2px ${props.$color};
    `}
    font-size: 2em;
    color: transparent;
    font-weight: 800;
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

const Stats = styled.div`
    margin-top: 2rem;
    display: flex;
    gap: 3rem;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const Paragraph = styled.p<{ $color: string }>`
    ${(props) => css`
        color: ${props.$color};
    `}
    font-size: 20px;
    margin: 0;

    ${atMinWidth.tablet} {
        font-size: 30px;
    }

    ${atMinWidth.desktop} {
        font-size: 40px;
    }
`;

const StyledParagraph = styled(Paragraph)`
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
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: space-between;
`;
const NumberContainer = styled(StatsContainer)`
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
    gap: 2.2rem;
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
    margin-top: 50px;

    ${atMinWidth.tablet} {
        padding: 48px 40px;
        margin-top: 00px;
    }

    ${atMinWidth.desktop} {
        padding: 48px 64px;
    }
`;

const StyledPaper = styled(Paper)`
    padding: 16px;
    height: max-content;
    font-family: Tahoma;
    overflow: scroll;
    height: 80%;
    grid-column: span 1;
    text-align: center;

    ${atMinWidth.tablet} {
        padding: 48px 3rem;
    }
    ${atMinWidth.desktop} {
        padding: 64px 64px;
    }
`;
