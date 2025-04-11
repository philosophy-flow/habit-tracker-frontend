import { useState } from "react";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { AuthForm, NavigateText, NavigateIcon } from "../components";
import {
    useAuthenticateAccountMutation,
    setAuthToken,
    useLazyGetCurrentUserQuery,
    useLazyGetHabitsQuery,
    setHabits,
    setCurrentUser,
} from "../features";
import {
    LoginForm,
    FormEvent,
    FormSubmit,
    AuthResponse,
    User,
    Habit,
} from "../types.ts";
import { RootState } from "../store.ts";

export default function LoginPage() {
    const [
        authenticateAccount,
        { isLoading: authLoading, isSuccess: authSuccess, isError: authError },
    ] = useAuthenticateAccountMutation();

    const [
        getCurrentUser,
        { isLoading: userLoading, isSuccess: userSuccess, isError: userError },
    ] = useLazyGetCurrentUserQuery();

    const [getHabits] = useLazyGetHabitsQuery();

    const [formInfo, setFormInfo] = useState({ username: "", password: "" });
    const authToken = useSelector((state: RootState) => state.authToken);

    const dispatch = useDispatch();

    const handleFormInput = (e: FormEvent) => {
        setFormInfo((state: LoginForm) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFormSubmit = async (e: FormSubmit) => {
        e.preventDefault();

        try {
            const authResponse: AuthResponse =
                await authenticateAccount(formInfo).unwrap();
            dispatch(setAuthToken(authResponse));

            const userResponse: User = await getCurrentUser().unwrap();
            dispatch(setCurrentUser(userResponse));

            const habitResponse: Habit[] = await getHabits().unwrap();
            dispatch(setHabits(habitResponse));
        } catch (error: unknown) {
            console.log("Login failed: ", error);
        }
    };

    if (authToken) {
        return <Navigate to="/habits" />;
    }

    return (
        <>
            <NavigateIcon navigateTo="" />
            <AuthForm
                type={"login"}
                isError={authError || userError}
                errorMessage="Authentication failed; please try again."
                isLoading={authLoading || userLoading}
                loadingMessage="Verifying ..."
                isSuccess={authSuccess && userSuccess}
                successMessage="You successfully logged in!"
                handleFormInput={handleFormInput}
                handleFormSubmit={handleFormSubmit}
            />
            <NavigateText
                helperText="Need an account?"
                anchorText="Signup"
                path="signup"
            />
        </>
    );
}
