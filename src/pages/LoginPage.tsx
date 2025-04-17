import { useState } from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { z } from "zod";

import { LoginForm, FormEvent, InputBlur } from "../types.ts";
import { RootState } from "../store.ts";
import { useLoginAccount } from "../hooks";
import { AuthForm, NavigateText, NavigateIcon } from "../components";

const usernameSchema = z
    .string()
    .min(3, "username must be at least 3 characters")
    .max(20, "username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed")
    .refine((val) => !/^_/.test(val) && !/_$/.test(val), {
        message: "username cannot start or end with underscore",
    });

const passwordSchema = z.string();

export default function LoginPage() {
    const [formInfo, setFormInfo] = useState({ username: "", password: "" });
    const [formError, setFormError] = useState({
        usernameError: "",
        passwordError: "",
    });
    const authToken = useSelector((state: RootState) => state.authToken);

    const { handleLogin, loginLoading, loginSuccess, loginError } =
        useLoginAccount(formInfo, formError, setFormError);

    const handleInputChange = (e: FormEvent) => {
        setFormInfo((state: LoginForm) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const handleInputBlur = (e: InputBlur) => {
        switch (e.target.name) {
            case "username":
                setFormError((prev) => ({
                    ...prev,
                    usernameError:
                        usernameSchema.safeParse(formInfo.username).error
                            ?.errors[0]?.message || "",
                }));
                break;
            case "password":
                setFormError((prev) => ({
                    ...prev,
                    passwordError:
                        passwordSchema.safeParse(formInfo.password).error
                            ?.errors[0]?.message || "",
                }));
                break;
            default:
                return;
        }
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
                handleInputChange={handleInputChange}
                handleInputBlur={handleInputBlur}
                handleFormSubmit={handleLogin}
                formInfo={formInfo}
                formError={formError}
            />
            <NavigateText
                helperText="Need an account?"
                anchorText="Signup"
                path="signup"
            />
        </>
    );
}
