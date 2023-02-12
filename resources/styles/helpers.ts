import { css, FlattenSimpleInterpolation } from "styled-components";

export const size = {
    breakpoints: {
        mobile: 480,
        tablet: 768,
        desktop: 992,
        xl: 1200,
    },
};

export const squareSize = (size: number): FlattenSimpleInterpolation => css`
    width: ${size}px;
    height: ${size}px;
`;

export const customMinMediaQuery = (minWidth: number) =>
    `@media (min-width: ${minWidth}px)`;

export const atMinWidth = {
    desktopLarge: customMinMediaQuery(size.breakpoints.xl),
    desktop: customMinMediaQuery(size.breakpoints.desktop),
    tablet: customMinMediaQuery(size.breakpoints.tablet),
    mobile: customMinMediaQuery(size.breakpoints.mobile),
    custom: (width: number) => customMinMediaQuery(width),
};
