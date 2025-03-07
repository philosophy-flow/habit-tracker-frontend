import { useState } from "react";
import { useDispatch } from "react-redux";

import { useAuthenticateAccountMutation, setCurrentUser } from "../features";
import { LoginForm, FormEvent, FormSubmit } from "../types.ts";

export default function LoginPage() {
    const [authenticateAccount, { isLoading, isSuccess, isError }] =
        useAuthenticateAccountMutation();
    const [formInfo, setFormInfo] = useState({ username: "", password: "" });
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
            const response = await authenticateAccount(formInfo).unwrap();
            console.log("Full response:", response);
            dispatch(setCurrentUser(response.user));
        } catch (error) {
            console.log(`Login failed: ${JSON.stringify(error)}`);
        }
    };

    return (
        <div>
            <h1>Welcome to Habit Tracker</h1>
            <br />
            {isError && (
                <div>
                    <p>Authentication failed; please try again.</p>
                </div>
            )}

            {!isSuccess && (
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

            {isLoading && (
                <div>
                    <p>Verifying ...</p>
                </div>
            )}

            {isSuccess && (
                <div>
                    <p>You successfully logged in!</p>
                </div>
            )}
        </div>
    );
}
