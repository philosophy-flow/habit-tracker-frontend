import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RegisterForm, FormEvent } from "../types";
import { RootState } from "../store";
import { useSignupAccount } from "../hooks";
import { AuthForm, NavigateText, NavigateIcon } from "../components";

export default function SignupPage() {
    const [formInfo, setFormInfo] = useState({
        email: "",
        username: "",
        password: "",
    });
    const authToken = useSelector((state: RootState) => state.authToken);

    const { signupAccount, signupLoading, signupSuccess, signupError } =
        useSignupAccount(formInfo);

    const handleFormInput = (e: FormEvent) => {
        setFormInfo((state: RegisterForm) => ({
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
                type={"signup"}
                isLoading={signupLoading}
                isSuccess={signupSuccess}
                isError={signupError}
                loadingMessage="Registering ..."
                successMessage="You successfully registered!"
                errorMessage="Registration failed; please try again."
                handleFormInput={handleFormInput}
                handleFormSubmit={signupAccount}
                formInfo={formInfo}
            />
            <NavigateText
                helperText="Already have an account?"
                anchorText="Login"
                path="login"
            />
        </>
    );
}
