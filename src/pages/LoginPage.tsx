import { useState } from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

import { LoginForm, FormEvent } from "../types.ts";
import { RootState } from "../store.ts";
import { useLoginAccount } from "../hooks";
import { AuthForm, NavigateText, NavigateIcon } from "../components";

export default function LoginPage() {
    const [formInfo, setFormInfo] = useState({ username: "", password: "" });
    const authToken = useSelector((state: RootState) => state.authToken);

    const { handleLogin, loginLoading, loginSuccess, loginError } =
        useLoginAccount(formInfo);

    const handleFormInput = (e: FormEvent) => {
        setFormInfo((state: LoginForm) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    return authToken ? (
        <Navigate to="/habits" />
    ) : (
        <>
            <NavigateIcon navigateTo="" />
            <AuthForm
                type={"login"}
                isLoading={loginLoading}
                isSuccess={loginSuccess}
                isError={loginError}
                loadingMessage="Verifying ..."
                successMessage="You successfully logged in!"
                errorMessage="Authentication failed; please try again."
                handleFormInput={handleFormInput}
                handleFormSubmit={handleLogin}
                formInfo={formInfo}
            />
            <NavigateText
                helperText="Need an account?"
                anchorText="Signup"
                path="signup"
            />
        </>
    );
}
