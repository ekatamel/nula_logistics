import { format, parseISO } from "date-fns";

export class MoneyFormatter extends Intl.NumberFormat {
    constructor(currency: string) {
        super("en-US", {
            currency: currency,
            minimumFractionDigits: 2,
            style: "currency",
        });
    }
}

export class HoursFormatter extends Intl.NumberFormat {
    constructor() {
        super("en-US", {
            minimumFractionDigits: 2,
        });
    }
}

export const dateFormatter = (date: string): string => {
    return format(parseISO(date), "dd. MM. yyyy");
};
