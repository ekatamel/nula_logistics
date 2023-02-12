import React, { ReactElement } from "react";
import { FC, ReactNode } from "react";
import styled from "styled-components";

export type IconSVGProps = {
    width?: number;
    height?: number;
    color?: string;
};

type IconProps = {
    Component: FC;
    className?: string;
    size?: number;
};

export const Icon: FC<IconProps> = ({ className, size, Component }) => {
    return (
        <StyledIcon size={size} className={className}>
            <Component />
        </StyledIcon>
    );
};

const StyledIcon = styled.div<{ size?: number }>`
    display: flex;
    color: inherit;

    > svg {
        width: ${({ size }) => size && `${size}px`};
        height: ${({ size }) => size && `${size}px`};
        margin: auto;
    }
`;
