import { useDispatch } from "react-redux";

import {
    useAuthenticateAccountMutation,
    useLazyGetCurrentUserQuery,
    useLazyGetHabitsQuery,
    setAuthToken,
    setCurrentUser,
    setHabits,
} from "../features";
import { FormSubmit, AuthResponse, User, Habit, AuthInfo } from "../types";

export default function useLoginAccount(authInfo: AuthInfo) {
    const dispatch = useDispatch();

    const [
        authenticateAccount,
        { isLoading: authLoading, isSuccess: authSuccess, isError: authError },
    ] = useAuthenticateAccountMutation();

    const [
        getCurrentUser,
        { isLoading: userLoading, isSuccess: userSuccess, isError: userError },
    ] = useLazyGetCurrentUserQuery();

    const [
        getHabits,
        {
            isLoading: habitsLoading,
            isSuccess: habitsSuccess,
            isError: habitsError,
        },
    ] = useLazyGetHabitsQuery();

    const handleLogin = async (e: FormSubmit) => {
        e.preventDefault();

        try {
            const authResponse: AuthResponse =
                await authenticateAccount(authInfo).unwrap();
            dispatch(setAuthToken(authResponse));

            const userResponse: User = await getCurrentUser().unwrap();
            dispatch(setCurrentUser(userResponse));

            const habitResponse: Habit[] = await getHabits().unwrap();
            dispatch(setHabits(habitResponse));
        } catch (error: unknown) {
            console.log("Login failed: ", error);
        }
    };

    const loginLoading = authLoading || userLoading || habitsLoading;
    const loginSuccess = authSuccess && userSuccess && habitsSuccess;
    const loginError = authError || userError || habitsError;

    return { handleLogin, loginLoading, loginSuccess, loginError };
}
