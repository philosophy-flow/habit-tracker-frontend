import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

import { FormEvent, FormSubmit } from "../types";
import { useRegisterAccountMutation } from "../features/apiSlice";
import { RegisterForm } from "../types";
import { RootState } from "../store";
import { AuthForm, NavigateText, NavigateIcon } from "../components";

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
            navigate("/confirmation");
        } catch (error: unknown) {
            console.log("Account registration failed: ", error);
        }
    };

    return authToken ? (
        <Navigate to="/habits" />
    ) : (
        <>
            <NavigateIcon navigateTo="" />
            <AuthForm
                type={"signup"}
                isError={isError}
                errorMessage="Registration failed; please try again."
                isLoading={isLoading}
                loadingMessage="Registering ..."
                isSuccess={isSuccess}
                successMessage="You successfully registered!"
                handleFormInput={handleFormInput}
                handleFormSubmit={handleFormSubmit}
            />
            <NavigateText
                helperText="Already have an account?"
                anchorText="Login"
                path="login"
            />
        </>
    );
}
