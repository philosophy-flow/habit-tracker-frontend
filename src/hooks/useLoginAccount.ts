import { useDispatch } from "react-redux";
import { z } from "zod";

import {
    useAuthenticateAccountMutation,
    useLazyGetCurrentUserQuery,
    useLazyGetHabitsQuery,
    setAuthToken,
    setCurrentUser,
    setHabits,
} from "../features";
import { FormSubmit, AuthResponse, User, Habit, LoginForm } from "../types";

const usernameSchema = z
    .string()
    .min(3, "username must be at least 3 characters")
    .max(20, "username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed")
    .refine((val) => !/^_/.test(val) && !/_$/.test(val), {
        message: "username cannot start or end with underscore",
    });

const passwordSchema = z.string();

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
                passwordSchema.safeParse(authInfo.password).error?.errors[0]
                    ?.message || "",
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
