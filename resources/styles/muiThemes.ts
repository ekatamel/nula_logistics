import { Overrides as CoreOverrides } from "@material-ui/core/styles/overrides";
import { createTheme, Theme } from "@material-ui/core";
import { colors } from "./colors";
import { AlertClassKey } from "@material-ui/lab";
import { CSSProperties } from "react";
import { size } from "./helpers";

const themes = createTheme({
    palette: {
        primary: {
            main: colors.brand,
        },
        secondary: {
            main: colors.brandYellow,
        },
    },

    typography: {
        fontFamily: "Tahoma",
        fontSize: 16,
    },

    breakpoints: {
        values: {
            xs: 400, // not used
            sm: size.breakpoints.mobile,
            md: size.breakpoints.tablet,
            lg: size.breakpoints.desktop,
            xl: size.breakpoints.xl,
        },
    },
});

type Overrides = CoreOverrides & {
    MuiAlert?:
        | Partial<Record<AlertClassKey, CSSProperties | (() => CSSProperties)>>
        | undefined;
};

type OverridesFunc = (theme: Theme) => Overrides;

export const createMuiAppThemeOverrides: OverridesFunc = (theme) => ({
    MuiTypography: {
        overline: {
            fontSize: "12px",
            color: colors.grey0,
        },

        body2: {
            fontSize: 14,
        },
        h1: {
            fontFamily: "Tahoma",
            fontWeight: "bold",
            fontSize: 48,
            color: colors.brandBlue,
        },
        h3: {
            fontSize: 31,
            marginBottom: 24,
            fontWeight: "bold",
            fontFamily: "Tahoma",
            color: colors.brandBlue,
        },

        subtitle1: {
            fontFamily: "Tahoma",
            fontWeight: "bold",
            fontStyle: "normal",
            fontSize: "30px",
            lineHeight: "26px",
            color: "#023E8A",
        },
    },

    MuiLink: {
        root: {
            textDecoration: "underline",
        },
        underlineHover: {
            textDecoration: "underline",
        },
    },

    MuiListItemIcon: {
        root: {
            color: colors.white,
        },
    },

    MuiButton: {
        root: {
            borderRadius: 4,
            outline: 0,
            fontWeight: 800,
            height: "48px",
            padding: "16px 32px",
            letterSpacing: "0.115em",
            fontFamily: "Tahoma",
            "&:focus": {
                outline: "none",
            },
        },

        sizeSmall: {
            height: "32px",
            fontSize: "10px",
            padding: "10px 32px",
        },

        containedPrimary: {
            color: `${colors.white} !important`,
            fontSize: "13px",
            boxShadow: "none",
            backgroundColor: `${colors.brandBlue} !important`,

            "&:hover": {
                color: `${colors.white} !important`,
                backgroundColor: `${colors.brandLightBlue} !important`,
                boxShadow: "none",
                transition: ".3s",
            },
        },

        textPrimary: {
            text: `${colors.brandBlue} !important`,
            border: `1px solid ${colors.brandBlue}`,
        },

        text: {
            padding: "16px 32px",
        },
    },

    MuiIconButton: {
        root: {
            "&:focus": {
                outline: "none",
            },
        },

        sizeSmall: {
            padding: 8,
        },
    },

    MuiInputBase: {
        root: {
            height: "48px",
            lineHeight: "48px",
            borderRadius: 0,
        },

        input: {
            border: "none !important",
            lineHeight: "1",
        },

        focused: {},
    },

    MuiOutlinedInput: {
        root: {
            height: "48px",
            borderRadius: 0,
        },

        input: {
            //important to overwrite border styles fgrm.scss
            border: "none !important",
            padding: "0 8px !important",
        },

        notchedOutline: {
            borderColor: colors.grey1,
        },

        focused: {
            outline: "none",
            backgroundColor: colors.white,
        },
    },

    MuiInputLabel: {
        root: {
            color: colors.grey0,
            fontWeight: "normal",
            textTransform: "uppercase",
            fontSize: "12px",
            letterSpacing: "0.05em",
            marginBottom: "8px",
            // to overwrite margin top from form label rule set in products.scss
            marginTop: 0,
        },
    },

    MuiSelect: {
        selectMenu: {
            lineHeight: "48px",
        },
    },

    MuiFormControlLabel: {
        root: {
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
        },
    },

    MuiAutocomplete: {
        endAdornment: {
            top: "calc(50% - 24px)",
        },
    },

    MuiSwitch: {
        root: {
            padding: "0",
            height: "24px",
            width: "40px",
            borderRadius: "12px",
        },

        switchBase: {
            padding: 0,
            top: "50%",
            left: 4,
            transform: "translateY(-50%)",

            "&$checked": {
                transform: "translateY(-50%) translateX(16px)",
            },
        },

        track: {
            backgroundColor: colors.grey1,
            opacity: 1,
        },

        thumb: {
            height: "16px",
            width: "16px",
            backgroundColor: colors.white,
        },

        colorPrimary: {
            "&$checked": {
                "& + $track": {
                    opacity: 1,
                    backgroundColor: colors.success,
                    // borderColor: colors.white,
                },
            },
        },
    },

    MuiPaper: {
        rounded: {
            borderRadius: 0,
        },
    },
    MuiPopover: {
        root: {
            display: "grid",
            placeItems: "center",
        },
    },
    MuiCardMedia: {
        root: {
            height: "24px",
        },
        media: {
            height: "34px",
        },
    },

    MuiSnackbarContent: {
        root: {
            color: colors.black,
            fontSize: "14px",
            lineHeight: "23.1px",
        },
    },

    MuiTable: {
        root: {
            // minWidth: 600,
            overflow: "scroll",
        },
    },

    MuiTableRow: {
        root: {
            height: 56,
            "&:hover:not(.MuiTableRow-head)": {
                backgroundColor: "#efefef61",
            },
        },
    },

    MuiTableCell: {
        head: {
            textTransform: "uppercase",
            color: colors.grey0,
            fontSize: 12,
        },
        root: {
            padding: 8,
        },
    },
    MuiDrawer: {
        paperAnchorDockedLeft: {
            borderRight: "none",
        },
    },
    MuiChip: {
        root: {
            backgroundColor: "#0077B6",
            color: colors.white,
        },
    },
    MuiTooltip: {
        tooltip: {
            backgroundColor: colors.brand,
            padding: "16px",
            lineHeight: "22px",
            fontSize: "14px",
        },
        arrow: {
            color: colors.brand,
        },
    },
});

themes.overrides = createMuiAppThemeOverrides(themes);

export const theme = themes;
