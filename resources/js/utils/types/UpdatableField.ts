export abstract class UpdatableField {
    fieldName: string;
    defaultValue: string | number | boolean | Date;
    keepVisible: boolean;
    alternatePath: string;

    protected constructor(
        defaultValue: string | number | boolean | Date,
        fieldName: string,
        alternatePath = ""
    ) {
        this.defaultValue = defaultValue;
        this.fieldName = fieldName;
        this.alternatePath = alternatePath;
    }

    getLabel(): string {
        return this.defaultValue ? String(this.defaultValue) : "-";
    }
}
