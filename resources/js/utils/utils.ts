import { useSnackbar } from "notistack";

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

export const getSupplierSelectGroup = (suppliers: any) => {
    return suppliers.map((supplier: any) => {
        return { value: supplier.id.toString(), label: supplier.name };
    });
};

export const isActive = (path: string): boolean => {
    if (window.location.pathname == path) return true;
    else return window.location.pathname + window.location.search == path;
};
