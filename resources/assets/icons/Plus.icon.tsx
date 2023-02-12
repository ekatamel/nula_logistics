import React from "react";
import { FC } from "react";
import { colors } from "../../styles/colors";
import { IconSVGProps } from "./Icon";

export const PlusIcon: FC<IconSVGProps> = ({
    width = 24,
    height = 24,
    color = colors.brand,
}) => (
    <svg
        width={`${width}px`}
        height={`${height}px`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 8.3999V15.5999"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8.40002 12H15.6"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
