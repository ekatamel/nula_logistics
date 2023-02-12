import { Tooltip, withStyles } from "@material-ui/core";
import { colors } from "../../../styles/colors";

export const ErrorTooltip = withStyles(() => ({
    tooltip: {
        backgroundColor: colors.error,
        color: "white",
        fontSize: 12,
    },
    arrow: {
        color: colors.error,
    },
}))(Tooltip);
