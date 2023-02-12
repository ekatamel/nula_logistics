import Slide from "@material-ui/core/Slide";
import { SnackbarProvider } from "notistack";
import React from "react";

interface Props {
    children: JSX.Element;
}

export const SnackProvider = ({ children }: Props) => {
    return (
        <SnackbarProvider
            maxSnack={10}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            TransitionComponent={Slide}
        >
            {children}
        </SnackbarProvider>
    );
};
