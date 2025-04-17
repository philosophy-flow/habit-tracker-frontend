import { useState } from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { z } from "zod";

import { LoginForm, FormEvent, InputBlur } from "../types.ts";
import { RootState } from "../store.ts";
import { useLoginAccount } from "../hooks";
import { AuthForm, NavigateText, NavigateIcon } from "../components";

// const emailSchema = z
//     .string()
//     .min(5, "Email is too short")
//     .max(254, "Email is too long")
//     .email("Invalid email format")
//     .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
//         message: "Email must include a domain (e.g. .com)",
//     });

// const passwordSchema = z
//     .string()
//     .min(8, "Password must contain at least 8 characters")
//     .regex(/[A-Z]/, "Must contain an uppercase letter")
//     .regex(/[0-9]/, "Must contain a number")
//     .regex(/[^A-Za-z0-9]/, "Must contain a symbol");

const usernameSchema = z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed")
    .refine((val) => !/^_/.test(val) && !/_$/.test(val), {
        message: "Username cannot start or end with underscore",
    });

const passwordSchema = z
    .string()
    .min(8, "Password must contain at least 8 characters");

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
