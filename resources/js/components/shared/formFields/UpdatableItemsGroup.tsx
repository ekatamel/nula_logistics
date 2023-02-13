import React, { FC, useState } from "react";
import styled from "styled-components";
import { colors } from "../../../../styles/colors";
import { ItemField } from "../ItemField";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { DataLine } from "../../../utils/types";
import { UpdatableField } from "../../../utils/types/UpdatableField";
import InfoIcon from "@material-ui/icons/Info";
import DeleteIcon from "@material-ui/icons/Delete";
import { Mutation, useCustomMutation } from "../../../utils/useCustomMutation";
import { useQueryClient } from "react-query";
import { useQueryNotification } from "../../../utils/utils";

type Props = {
    name?: string;
    updatePaths: string[];
    items: DataLine[];
    columnLabels?: string[];
    updatable?: boolean;
};
export const UpdatableItemsGroup: FC<Props> = (props) => {
    const { updatePaths, items, name, columnLabels, updatable } = props;

    const [errors, setErrors] = useState({});
    const queryClient = useQueryClient();
    const { successNotification, errorNotification } = useQueryNotification();

    const createDeleteMutation: Mutation<string> = (updatePath) => {
        return {
            path: updatePath,
            method: "DELETE",
        };
    };

    const deleteMutation = useCustomMutation<Response, any, string>(
        createDeleteMutation,
        {
            onSuccess: async (data) => {
                await queryClient.refetchQueries();
                successNotification("Deleted");
            },
            onError: (err) => {
                errorNotification("Something happend");
            },
        },
        true
    );

    const deleteResource = (updatablePath: string) => {
        deleteMutation.mutate(updatablePath);
    };

    const getError = (updatableField: UpdatableField): string => {
        if (updatableField.fieldName in errors) {
            return errors[updatableField.fieldName];
        } else return "";
    };
    return (
        <UpdatableGroupContainer>
            {name && <UpdatableGroupHeading>{name}</UpdatableGroupHeading>}
            {columnLabels && (
                <LabelLine>
                    <LabelContainer>
                        {columnLabels?.map((column) => (
                            <ColumnLabel key={column}>{column}</ColumnLabel>
                        ))}
                    </LabelContainer>
                </LabelLine>
            )}

            {items.map((item) => (
                <Line key={item.label}>
                    <ItemLabel>
                        <span>{item.label}</span>
                        {item.description && (
                            <InfoTooltipContainer>
                                <Tooltip title={item.description}>
                                    <StyledInfoIcon />
                                </Tooltip>
                            </InfoTooltipContainer>
                        )}
                    </ItemLabel>
                    <ItemsContainer>
                        {item?.updatableFields?.map((updatableField, i) => (
                            <React.Fragment key={i}>
                                <ItemField
                                    key={i}
                                    updatableField={updatableField}
                                    updatePath={updatePaths[i] ?? ""}
                                    error={getError(updatableField)}
                                    errorsAppeared={(errors) => {
                                        setErrors(errors);
                                    }}
                                    updatable={updatable ?? true}
                                />
                                {item.deleteIcon && (
                                    <span>
                                        <IconButton
                                            color={"primary"}
                                            size={"small"}
                                            onClick={() =>
                                                deleteResource(
                                                    updatableField.alternatePath
                                                )
                                            }
                                        >
                                            <DeleteIcon fontSize={"small"} />
                                        </IconButton>
                                    </span>
                                )}
                            </React.Fragment>
                        ))}
                        {item.notUpdatableFields}
                    </ItemsContainer>
                </Line>
            ))}
        </UpdatableGroupContainer>
    );
};

const ColumnLabel = styled.p`
    font-weight: bold;
    flex: 1;
    min-width: 151px;
`;

export const UpdatableGroupContainer = styled.div`
    margin: 1.5em 0;
`;

const Line = styled(Grid)`
    min-height: 38px;
    margin: 10px 0;
    display: flex;
`;

const LabelLine = styled(Line)`
    justify-content: flex-end;
`;

const LabelContainer = styled.div`
    flex: 0 0 calc(66.7% - 40px);
    display: flex;
    column-gap: 10px;
`;

export const UpdatableGroupHeading = styled.h3`
    margin-bottom: 0.8em;
    padding-top: 0.5em;
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

export const ItemLabel = styled.p`
    font-size: 1em;
    color: ${colors.grey0};
    flex: 1;
    margin: 0;
    padding-top: 5px;
`;

const InfoTooltipContainer = styled.span`
    padding-left: 6px;
`;

const StyledInfoIcon = styled(InfoIcon)`
    height: 19px;
    transform: translateY(-1px);
`;
