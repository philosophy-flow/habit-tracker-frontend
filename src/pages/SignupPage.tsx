import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router";

import { FormEvent, FormSubmit } from "../types";
import { useRegisterAccountMutation } from "../features/apiSlice";
import { RegisterForm } from "../types";
import { RootState } from "../store";
import AuthForm from "../components/AuthForm";

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
    );
}
