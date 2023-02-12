import React from "react";
import { FC } from "react";
import { IconSVGProps } from "./Icon";

export const SearchIcon: FC<IconSVGProps> = ({ width = 24, height = 24 }) => (
    <svg
        width={`${width}px`}
        height={`${height}px`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <g
            stroke="#14141F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            clipPath="url(#clip0)"
        >
            <path d="M13.357 18.653a9.063 9.063 0 10-7.09-16.682 9.063 9.063 0 007.09 16.682zM16.22 16.72l7.03 7.03"></path>
        </g>
        <defs>
            <clipPath id="clip0">
                <path
                    fill="#fff"
                    d="M0 0H24V24H0z"
                    transform="translate(0 .5)"
                ></path>
            </clipPath>
        </defs>
    </svg>
);
