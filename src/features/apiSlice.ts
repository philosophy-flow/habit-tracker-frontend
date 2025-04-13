import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import {
    LoginForm,
    AuthResponse,
    User,
    RegisterForm,
    Habit,
    HabitAdd,
    HabitToggle,
    HabitUpdate,
} from "../types";
import { RootState } from "../store";
import { setAuthToken } from "./authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://localhost:8000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const authToken = (getState() as RootState).authToken;
        if (authToken) {
            headers.set("authorization", `Bearer ${authToken}`);
        }
    },
});

const baseQueryWithRefresh: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let authResult = await baseQuery(args, api, extraOptions);

    if (authResult.error && authResult.error.status === 401) {
        const refreshResult = await baseQuery("/refresh", api, extraOptions);
        if (refreshResult.data) {
            api.dispatch(setAuthToken(refreshResult.data as AuthResponse));
            authResult = await baseQuery(args, api, extraOptions);
        } else {
            console.log("Unable to authenticate account. Please login again.");
        }
    }

    return authResult;
};

export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithRefresh,
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
        getHabits: builder.query<Habit[], void>({
            query: () => "/get-habits",
        }),
        addHabit: builder.mutation<{ message: string }, HabitAdd>({
            query: (habitData: HabitAdd) => {
                return {
                    url: "/create-habit",
                    method: "POST",
                    body: habitData,
                };
            },
        }),
        deleteHabit: builder.mutation<{ message: string }, string>({
            query: (habitId: string) => {
                return {
                    url: `/delete-habit/${habitId}`,
                    method: "DELETE",
                };
            },
        }),
        toggleHabit: builder.mutation<{ message: string }, HabitToggle>({
            query: (habitData: HabitToggle) => {
                return {
                    url: `/update-habit/${habitData.id}/completions/${habitData.date_completed}`,
                    method: "PUT",
                };
            },
        }),
        updateHabit: builder.mutation<{ message: string }, HabitUpdate>({
            query: (habitData: HabitUpdate) => {
                return {
                    url: `/update-habit/${habitData.id}`,
                    method: "PATCH",
                    body: {
                        name: habitData.name || null,
                        frequency: habitData.frequency || null,
                    },
                };
            },
        }),
    }),
});

export const {
    useAuthenticateAccountMutation,
    useRefreshAccountMutation,
    useSignoutAccountMutation,
    useRegisterAccountMutation,
    useLazyGetCurrentUserQuery,
    useLazyGetHabitsQuery,
    useAddHabitMutation,
    useDeleteHabitMutation,
    useToggleHabitMutation,
    useUpdateHabitMutation,
} = api;
