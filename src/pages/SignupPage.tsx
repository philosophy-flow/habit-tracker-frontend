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
    const [formError, setFormError] = useState({
        usernameError: "",
        passwordError: "",
    });
    const authToken = useSelector((state: RootState) => state.authToken);

    const { signupAccount, signupLoading, signupSuccess, signupError } =
        useSignupAccount(formInfo);

    const handleInputChange = (e: FormEvent) => {
        setFormInfo((state: RegisterForm) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const handleInputBlur = () => {
        setFormError((prev) => ({ ...prev }));
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
                handleInputChange={handleInputChange}
                handleInputBlur={handleInputBlur}
                handleFormSubmit={signupAccount}
                formInfo={formInfo}
                formError={formError}
            />
            <NavigateText
                helperText="Already have an account?"
                anchorText="Login"
                path="login"
            />
        </>
    );
}
