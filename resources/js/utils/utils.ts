import { useSnackbar } from "notistack";
import { Product, Supplier } from "./types";

export const useQueryNotification = () => {
    const { enqueueSnackbar } = useSnackbar();
    return {
        successNotification: (message: string) => {
            enqueueSnackbar(message, {
                variant: "success",
                preventDuplicate: true,
            });
        },
        errorNotification: (message: string) => {
            enqueueSnackbar(message, {
                variant: "error",
                title: "Update error",
                preventDuplicate: true,
                persist: false,
            });
        },
    };
};

export const getErrorsString = (errors: any[]): string => {
    let ret = "";
    for (const key in errors) {
        ret += key + " " + errors[key];
    }
    return ret || "Error";
};

export const getSupplierSelectGroup = (suppliers?: Supplier[]) => {
    return suppliers?.map((supplier: Supplier) => {
        return { value: supplier.id.toString(), label: supplier.name };
    });
};
export const getProductsSelectGroup = (products?: Product[]) => {
    return products?.map((product: Product) => {
        return { value: product.id.toString(), label: product.name };
    });
};

export const isActive = (path: string): boolean => {
    if (window.location.pathname == path) return true;
    else return window.location.pathname + window.location.search == path;
};

export const numberWithSpaces = (x: number): string => {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
};

export const roundToTwoFractionalNumbers = (value: number): number =>
    Math.round(value * 100) / 100;
