import {
    api,
    useAuthenticateAccountMutation,
    useRefreshAccountMutation,
    useSignoutAccountMutation,
    useLazyGetCurrentUserQuery,
    useLazyGetHabitsQuery,
    useAddHabitMutation,
    useDeleteHabitMutation,
} from "./apiSlice";
export {
    api,
    useAuthenticateAccountMutation,
    useRefreshAccountMutation,
    useSignoutAccountMutation,
    useLazyGetCurrentUserQuery,
    useLazyGetHabitsQuery,
    useAddHabitMutation,
    useDeleteHabitMutation,
};

import userReducer, { setCurrentUser } from "./userSlice";
export { userReducer, setCurrentUser };

import authReducer, { setAuthToken } from "./authSlice";
export { authReducer, setAuthToken };

import habitReducer, { setHabits } from "./habitSlice";
export { habitReducer, setHabits };
