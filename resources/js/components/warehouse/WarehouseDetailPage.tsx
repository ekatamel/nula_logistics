import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { Supplier, Warehouse } from "../../utils/types";
import { PageLayoutWrapper } from "../shared/PageLayoutWrapper";
import styled from "styled-components";
import { Paper, Typography } from "@material-ui/core";
import { atMinWidth } from "../../../styles/helpers";
import { getSupplierSelectGroup } from "../../utils/utils";
import { colors } from "../../../styles/colors";
import {
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
} from "@material-ui/core";
import { WarehouseProductsRow } from "./WarehouseProductsRow";
import { Button } from "../shared/Button";
import { PlusIcon } from "../../../assets/icons/Plus.icon";
import { WarehouseInfoTabs } from "./WarehouseInfoTabs";
import { AssignProductToWarehouse } from "./AssignProductToWarehouse";
import { Layout } from "../layout/Layout";
import { AuthContext } from "../auth/authContext";

export const WarehouseDetailPage = () => {
    const { id } = useParams();
    const [dialogOpened, setDialogOpened] = useState(false);

    const { authData } = useContext(AuthContext);

    const queryKey = `/api/warehouses/${id}`;

    const { data: warehouse } = useQuery<Warehouse>(queryKey, {
        enabled: authData.signedIn,
    });

    const { data: suppliers } = useQuery<Supplier[]>(`/api/suppliers`, {
        enabled: authData.signedIn,
    });

    const suppliersSelect = suppliers && getSupplierSelectGroup(suppliers);
    const src =
        warehouse &&
        `https://maps.google.com/maps?q=${encodeURIComponent(
            warehouse?.address
        )}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    const areNoProducts =
        !warehouse?.products || warehouse?.products.length === 0;

    return (
        <Layout>
            <PageLayoutWrapper>
                {warehouse && (
                    <Grid>
                        <StyledPaper elevation={10}>
                            <Typography variant="h3">Warehouse</Typography>
                            {suppliersSelect && (
                                <WarehouseInfoTabs
                                    warehouse={warehouse}
                                    suppliers={suppliersSelect}
                                />
                            )}
                        </StyledPaper>
                        <StyledPaper elevation={10}>
                            <Typography variant="h3">Location</Typography>
                            {src && (
                                <iframe
                                    src={src}
                                    width="100%"
                                    height="300"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    aria-hidden="false"
                                    tabIndex={0}
                                />
                            )}
                        </StyledPaper>
                        <StyledLargePaper elevation={10}>
                            <TableHeaderContainer>
                                <Typography variant="h3">
                                    Products management
                                </Typography>{" "}
                                <Button
                                    kind={"primary"}
                                    onClick={() => setDialogOpened(true)}
                                >
                                    <PlusIcon color={colors.white} />
                                    <ButtonText>Assign new product</ButtonText>
                                </Button>
                            </TableHeaderContainer>

                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Product Name</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Supplier</TableCell>
                                            <TableCell>In stock</TableCell>
                                            <TableCell>Date added</TableCell>
                                            <TableCell>Date updated</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {areNoProducts && (
                                            <TableRow>
                                                <TableCell>
                                                    Warehouse is empty.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {warehouse?.products?.map((product) => (
                                            <WarehouseProductsRow
                                                key={product.id}
                                                product={product}
                                                queryKey={queryKey}
                                                warehouseId={warehouse.id}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <AssignProductToWarehouse
                                dialogOpened={dialogOpened}
                                setDialogOpened={setDialogOpened}
                                warehouseId={warehouse?.id}
                            />
                        </StyledLargePaper>
                    </Grid>
                )}
            </PageLayoutWrapper>
        </Layout>
    );
};

const Grid = styled.div`
    display: grid;
    grid-gap: 1.5rem;
    grid-template-columns: 1fr;
    grid-template-rows: auto 3fr;

    ${atMinWidth.tablet} {
        padding: 48px 40px;
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
        padding: 48px 3rem;
    }
`;

const StyledLargePaper = styled(StyledPaper)`
    grid-column: span 1;
    ${atMinWidth.desktop} {
        grid-column: span 2;
    }
`;

export const ItemLabel = styled.p`
    font-size: 1em;
    color: ${colors.grey0};
    flex: 1;
    margin: 0;
    padding-top: 5px;
`;

export const ItemsContainer = styled.div`
    flex: 3;
    display: flex;
    padding-left: 40px;
    column-gap: 10px;
    > * {
        flex: 1;
    }
`;

const TableHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ButtonText = styled.span`
    margin-left: 10px;
`;
