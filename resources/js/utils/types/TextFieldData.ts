import { UpdatableField } from "./UpdatableField";

export type SupportedTextFieldType = "text" | "email" | "tel" | "number";
export class TextFieldData extends UpdatableField {
    fieldType: SupportedTextFieldType;
    keepVisible = false;

    constructor(
        defaultValue: string | number,
        fieldName: string,
        fieldType: SupportedTextFieldType = "text",
        alternatePath = ""
    ) {
        super(defaultValue, fieldName, alternatePath);
        this.fieldType = fieldType;
    }
}
