import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface FormState {
    username: string;
    password: string;
}

interface UserState {
    profile: {
        userId: string;
        email: string;
        username: string;
        profileImageUrl: string;
        accountVerified: boolean;
    };
    token: {
        access_token: string;
        token_type: string;
    };
    loggedIn: boolean;
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
    endpoints: (build) => ({
        authenticateAccount: build.mutation<UserState, FormState>({
            query: (credentials: FormState) => {
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
