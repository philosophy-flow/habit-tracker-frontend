import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginForm, UserResponse } from "../types";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
    endpoints: (build) => ({
        authenticateAccount: build.mutation<UserResponse, LoginForm>({
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
    }),
});

export const { useAuthenticateAccountMutation } = api;
