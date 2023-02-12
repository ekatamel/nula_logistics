import React, { FC } from "react";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { InputLabel } from "@material-ui/core";
import { KeyboardDatePickerProps } from "@material-ui/pickers/DatePicker/DatePicker";

type Props = KeyboardDatePickerProps & {
    name?: string;
    required?: boolean;
};
export const FormDatePicker: FC<Props> = (props) => {
    const { label, required, name, value, onChange, onBlur, ...rest } = props;

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <>
                {label && (
                    <InputLabel htmlFor={name}>
                        {label}
                        {required && " *"}
                    </InputLabel>
                )}
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd. MM. yyyy"
                    margin="none"
                    value={value}
                    onChange={(date) => onChange(date)}
                    onBlur={onBlur}
                    KeyboardButtonProps={{
                        "aria-label": "change date",
                    }}
                    {...rest}
                />
            </>
        </MuiPickersUtilsProvider>
    );
};
