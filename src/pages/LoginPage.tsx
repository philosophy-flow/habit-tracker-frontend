import { useState } from "react";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
    useAuthenticateAccountMutation,
    setAuthToken,
    useLazyGetCurrentUserQuery,
    setCurrentUser,
} from "../features";
import {
    LoginForm,
    FormEvent,
    FormSubmit,
    AuthResponse,
    User,
} from "../types.ts";
import { RootState } from "../store.ts";

export default function LoginPage() {
    const [
        authenticateAccount,
        { isLoading: authLoading, isSuccess: authSucess, isError: authError },
    ] = useAuthenticateAccountMutation();

    const [
        getCurrentUser,
        { isLoading: userLoading, isSuccess: userSuccess, isError: userError },
    ] = useLazyGetCurrentUserQuery();

    const [formInfo, setFormInfo] = useState({ username: "", password: "" });
    const authToken = useSelector((state: RootState) => state.authToken);

    const dispatch = useDispatch();

    const handleFormInput = (e: FormEvent) => {
        e.preventDefault();

        setFormInfo((state: LoginForm) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFormSubmit = async (e: FormSubmit) => {
        e.preventDefault();

        try {
            const authResponse: AuthResponse = await authenticateAccount(
                formInfo
            ).unwrap();
            dispatch(setAuthToken(authResponse));

            const userResponse: User = await getCurrentUser().unwrap();
            dispatch(setCurrentUser(userResponse));
        } catch (error: unknown) {
            console.log("Login failed: ", error);
        }
    };

    if (authToken) {
        return <Navigate to="/habits" />;
    }

    return (
        <div>
            <h1>Welcome to Habit Tracker</h1>
            <br />
            {(authError || userError) && (
                <div>
                    <p>Authentication failed; please try again.</p>
                </div>
            )}

            {(!authSucess || !userSuccess) && (
                <form onSubmit={(e) => handleFormSubmit(e)}>
                    <label htmlFor="username-field">Username:</label>
                    <input
                        onChange={(e) => handleFormInput(e)}
                        id="username-field"
                        name="username"
                    />

                    <label htmlFor="password-field">Password:</label>
                    <input
                        onChange={(e) => handleFormInput(e)}
                        id="password-field"
                        name="password"
                    />
                    <button type="submit">Submit</button>
                </form>
            )}

            {(authLoading || userLoading) && (
                <div>
                    <p>Verifying ...</p>
                </div>
            )}

            {authSucess && userSuccess && (
                <div>
                    <p>You successfully logged in!</p>
                </div>
            )}
        </div>
    );
}
