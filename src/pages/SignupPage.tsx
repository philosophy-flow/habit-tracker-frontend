import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router";

import { FormEvent, FormSubmit } from "../types";
import { useRegisterAccountMutation } from "../features/apiSlice";
import { Header, Button } from "../components";
import { RegisterForm } from "../types";
import { RootState } from "../store";

export default function SignupPage() {
    const navigate = useNavigate();
    const authToken = useSelector((state: RootState) => state.authToken);
    const [formInfo, setFormInfo] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [registerAccount, { isLoading, isSuccess, isError }] =
        useRegisterAccountMutation();

    const handleFormInput = (e: FormEvent) => {
        setFormInfo((state: RegisterForm) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFormSubmit = async (e: FormSubmit) => {
        e.preventDefault();
        try {
            const registerResponse = await registerAccount(formInfo).unwrap();
            console.log(registerResponse);
            navigate("/login");
        } catch (error: unknown) {
            console.log("Account registration failed: ", error);
        }
    };

    if (authToken) {
        return <Navigate to="/habits" />;
    }

    return (
        <>
            <Header label="Sign Up" />
            {isError && (
                <div>
                    <p>Registration failed; please try again.</p>
                </div>
            )}
            {!isSuccess && (
                <form
                    className="my-2 rounded border border-[#009963] p-2"
                    onSubmit={(e) => handleFormSubmit(e)}
                >
                    <label htmlFor="email-field">Email:</label>
                    <input
                        className="g-gray-50 focus:border-red focus:ring-red mb-4 block w-full rounded-lg border border-[#009963] p-2.5 text-sm"
                        onChange={(e) => handleFormInput(e)}
                        id="email-field"
                        name="email"
                        type="text"
                    />
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

            {isLoading && (
                <div>
                    <p>Registering ...</p>
                </div>
            )}

            {isSuccess && (
                <div>
                    <p>You successfully registered!</p>
                </div>
            )}
        </>
    );
}
