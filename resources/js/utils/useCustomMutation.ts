import { useCallback } from "react";
import { useMutation } from "react-query";
import { UseMutationOptions } from "react-query/types/react/types";
import { useQueryNotification } from "../utils/utils";
import axios from "axios";

type MutationFunction<TVariables, TData, TError, TContext> = (
    variables: TVariables
) => Promise<TData>;

type ReturnTypes<TVariables, TData, TError, TContext> = ReturnType<
    typeof useMutation<TData, TError, TVariables, TContext>
>;

export type Mutation<TVariables> = (variables: TVariables) => {
    method?: "POST" | "PUT" | "DELETE" | "PATCH";
    path: string;
    params?: any;
};

export function useCustomMutation<
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown
>(
    mutation: Mutation<TVariables>,
    options: UseMutationOptions<TData, TError, TVariables, TContext>,
    returnErrorBody = false
): ReturnTypes<TVariables, TData, TError, TContext> {
    const { errorNotification } = useQueryNotification();

    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

    //@ts-ignore
    const mutationFn: MutationFunction<TVariables, TData, TError, TContext> =
        useCallback(
            async (variables) => {
                const { method, path, params } = mutation(variables);
                const fetchOptions = {
                    method: method || "POST",
                    headers: new Headers({
                        "X-CSRF-Token": csrfToken ? csrfToken : "",
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                    }),
                    body: params ? JSON.stringify(params) : undefined,
                    credentials: "include",
                };
                // @ts-ignore
                const response = await fetch(path, fetchOptions);
                if (response.ok) {
                    return response;
                } else if (response.status === 500) {
                    errorNotification(
                        "Backend is having issues :-(. We'll let you know as soon as it's fixed."
                    );
                    return Promise.reject();
                } else {
                    const parsedResponse = await response.json();
                    if (returnErrorBody) {
                        return Promise.reject({
                            ...parsedResponse,
                            status: response.status,
                        });
                    } else {
                        return Promise.reject({
                            ...parsedResponse.message,
                            status: response.status,
                        });
                    }
                }
            },
            [mutation]
        );

    return useMutation<TData, TError, TVariables, TContext>(
        mutationFn,
        options
    );
}
