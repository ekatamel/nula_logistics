import { Overrides as CoreOverrides } from "@material-ui/core/styles/overrides";
import { createMuiTheme, Theme } from "@material-ui/core";
import { colors } from "./colors";
import { AlertClassKey } from "@material-ui/lab";
import { CSSProperties } from "react";
import { size } from "./helpers";

const themes = createMuiTheme({
    palette: {
        primary: {
            main: colors.brand,
        },
        secondary: {
            main: colors.brandYellow,
        },
    },

    typography: {
        fontFamily: "Ginto Normal Regular",
        fontSize: 16,
    },

    breakpoints: {
        //TODO: connect with size.breakpoints

        // mobile: "480px",
        // tablet: "768px",
        // desktop: "992px",
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
            fontFamily: "Ginto Nord",
            fontSize: 48,
        },
        h3: {
            fontSize: 31,
            marginBottom: 24,
            fontFamily: "Ginto Nord",
        },

        subtitle1: {
            fontFamily: "Ginto Normal Regular",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "14px",
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

    MuiButton: {
        root: {
            borderRadius: 0,
            outline: 0,
            fontWeight: 800,
            height: "48px",
            padding: "16px 32px",
            letterSpacing: "0.115em",
            fontFamily: "Ginto Nord",
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
            // boxShadow: "none",

            "&:hover": {
                color: `${colors.white} !important`,
                backgroundColor: `${colors.brandLight} !important`,
                boxShadow: "none",
                transition: ".3s",
            },
            // "@media(hover:none)": {
            //   "&:hover": {
            //     color: `${colors.white} !important`,
            //     backgroundColor: `${colors.brand} !important`,
            //   },
            // },
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

        // FIXME: border: "none !important" to overwrite styles from form.scss
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
            [theme.breakpoints.down("md")]: {
                padding: 11,
            },
        },
    },
    MuiDrawer: {
        paperAnchorDockedLeft: {
            borderRight: "none",
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
