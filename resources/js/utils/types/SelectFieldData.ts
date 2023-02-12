import { UpdatableField } from "./UpdatableField";
import { SelectItem } from "../types";

export class SelectFieldData extends UpdatableField {
    defaultValue: string | number;
    options: SelectItem[];
    keepVisible = false;

    constructor(
        defaultValue: string | number,
        fieldName: string,
        options: SelectItem[],
        alternatePath = ""
    ) {
        super(defaultValue, fieldName, alternatePath);
        this.options = options;
    }

    getLabel(): string {
        const foundOption = this.options.find((option) => {
            if (!this.defaultValue) {
                if (!option.value) return true;
            }
            return option.value == this.defaultValue;
        });
        return foundOption?.label || "-";
    }
}
