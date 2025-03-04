import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface TokenState {
    message: string;
    access_token: string;
    token_type: string;
}

export const authenticationApi = createApi({
    reducerPath: "authenticate",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000" }),
    endpoints: (builder) => ({
        registerAccount: builder.query<TokenState, string>({
            query: (name) => "register",
        }),
    }),
});

export const { useRegisterAccountQuery } = authenticationApi;

// interface UserState {
//     profile: {
//         userId: string;
//         email: string;
//         username: string;
//         profileImageUrl: string;
//         accountVerified: boolean;
//     };
//     token: string;
//     loggedIn: boolean;
// }
