import { useDispatch } from "react-redux";

import { FormSubmit, AuthResponse, User, Habit, LoginForm } from "../types";
import { usernameSchema, passwordSchemaLogin } from "../schemas";
import {
    useAuthenticateAccountMutation,
    useLazyGetCurrentUserQuery,
    useLazyGetHabitsQuery,
    setAuthToken,
    setCurrentUser,
    setHabits,
} from "../features";

export default function useLoginAccount(
    authInfo: LoginForm,
    formError: { usernameError: string; passwordError: string },
    setFormError: React.Dispatch<
        React.SetStateAction<{
            usernameError: string;
            passwordError: string;
        }>
    >,
) {
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

        setFormError((prev) => ({
            ...prev,
            usernameError:
                usernameSchema.safeParse(authInfo.username).error?.errors[0]
                    ?.message || "",
        }));

        setFormError((prev) => ({
            ...prev,
            passwordError:
                passwordSchemaLogin.safeParse(authInfo.password).error
                    ?.errors[0]?.message || "",
        }));

        if (!formError.usernameError && !formError.passwordError) {
            try {
                const authResponse: AuthResponse =
                    await authenticateAccount(authInfo).unwrap();
                dispatch(setAuthToken(authResponse));

                const userResponse: User = await getCurrentUser().unwrap();
                dispatch(setCurrentUser(userResponse));

                const habitResponse: Habit[] = await getHabits().unwrap();
                dispatch(setHabits(habitResponse));
            } catch (error: unknown) {
                console.error("Login failed: ", error);
            }
        }
    };

    const loginLoading = authLoading || userLoading || habitsLoading;
    const loginSuccess = authSuccess && userSuccess && habitsSuccess;
    const loginError = authError || userError || habitsError;

    return { handleLogin, loginLoading, loginSuccess, loginError };
}
