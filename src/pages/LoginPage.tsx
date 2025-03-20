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
import { Button, Header } from "../components";

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
        } catch (error: unknown) {
            console.log("Login failed: ", error);
        }
    };

    if (authToken) {
        return <Navigate to="/habits" />;
    }

    return (
        <div>
            <Header label="Login" />
            {(authError || userError) && (
                <div>
                    <p>Authentication failed; please try again.</p>
                </div>
            )}

            {(!authSucess || !userSuccess) && (
                <form
                    className="my-2 rounded border border-[#009963] p-2"
                    onSubmit={(e) => handleFormSubmit(e)}
                >
                    <label htmlFor="username-field">Username:</label>
                    <input
                        className="g-gray-50 focus:border-red focus:ring-red mb-4 block w-full rounded-lg border border-[#009963] p-2.5 text-sm"
                        onChange={(e) => handleFormInput(e)}
                        id="username-field"
                        name="username"
                        type="text"
                    />

                    <label htmlFor="password-field">Password:</label>
                    <input
                        className="g-gray-50 focus:border-red focus:ring-red mb-4 block w-full rounded-lg border border-[#009963] p-2.5 text-sm"
                        onChange={(e) => handleFormInput(e)}
                        id="password-field"
                        name="password"
                        type="password"
                    />

                    <Button label="Submit" />
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
