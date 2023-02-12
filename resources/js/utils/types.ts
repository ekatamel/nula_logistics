import { FormikHelpers } from "formik";

export type ProductFilter = {
    name: string;
    priceFrom: string;
    priceTo: string;
    dateAddedFrom: string;
    dateAddedTo: string;
};

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

export interface Warehouse {}
