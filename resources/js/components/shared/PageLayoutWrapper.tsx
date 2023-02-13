import styled from "styled-components";
import { atMinWidth } from "../../../styles/helpers";

export const PageLayoutWrapper = styled.div`
    margin-right: 0;

    ,
    ${atMinWidth.tablet} {
        margin-right: 1rem;
    }

    ${atMinWidth.desktop} {
        margin-right: 3rem;
    }
`;
