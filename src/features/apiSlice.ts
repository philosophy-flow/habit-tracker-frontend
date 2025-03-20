import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginForm, AuthResponse, User, RegisterForm } from "../types";
import { RootState } from "../store";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:8000",
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const authToken = (getState() as RootState).authToken;
            if (authToken) {
                headers.set("authorization", `Bearer ${authToken}`);
            }
        },
    }),
    endpoints: (builder) => ({
        authenticateAccount: builder.mutation<AuthResponse, LoginForm>({
            query: (credentials: LoginForm) => {
                const formData = new URLSearchParams();
                formData.append("username", credentials.username);
                formData.append("password", credentials.password);
                formData.append("grant_type", "password");

                return {
                    url: "/authenticate",
                    method: "POST",
                    body: formData,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                };
            },
        }),
        refreshAccount: builder.mutation<AuthResponse, void>({
            query: () => {
                return {
                    url: "/refresh",
                    method: "GET",
                };
            },
        }),
        signoutAccount: builder.mutation<{ message: string }, void>({
            query: () => {
                return {
                    url: "/logout",
                    method: "GET",
                };
            },
        }),
        registerAccount: builder.mutation<{ message: string }, RegisterForm>({
            query: (userData: RegisterForm) => {
                return { url: "/register", method: "POST", body: userData };
            },
        }),
        getCurrentUser: builder.query<User, void>({
            query: () => "/user",
        }),
    }),
});

export const {
    useAuthenticateAccountMutation,
    useRefreshAccountMutation,
    useSignoutAccountMutation,
    useRegisterAccountMutation,
    useLazyGetCurrentUserQuery,
} = api;
