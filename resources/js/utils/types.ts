import { FormikHelpers } from "formik";

export interface User {
    name: string;
    signedIn: boolean;
}

export interface ProductFilter {
    name: string;
    priceFrom: string;
    priceTo: string;
    dateAddedFrom: string;
    dateAddedTo: string;
}

export interface WarehouseFilter {
    query: string;
    totalProductsFrom: string;
    totalProductsTo: string;
}

export enum SearchInputType {
    text = "text",
    number = "number",
}

export type FormikSubmitHandler<Values> = (
    values: Values,
    formikHelpers: FormikHelpers<Values>
) => void | Promise<any>;

export type SelectItem = {
    value: string | number;
    label: string;
};

export interface Product {
    id: number;
    name: string;
    price: string;
    supplier_id: number;
    supplier: Supplier;
    warehouses: Warehouse[];
    created_at: string;
    updated_at: string;
    quantity: number;
}

export interface Supplier {
    id: number;
    name: string;
    address: string;
    created_at: string;
    updated_at: string;
    products: Product[];
    warehouses: Warehouse;
}

export interface Warehouse {
    id: number;
    name: string;
    address: string;
    supplier: Supplier;
    products: Product[];
    created_at: string;
    updated_at: string;
    product_count: number;
}

export type DataLine = {
    label: string;
    description?: string;
    updatableFields?: UpdatableField[];
    notUpdatableFields?: number | JSX.Element;
    deleteIcon?: boolean;
};

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
