import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { z } from "zod";

import { RegisterForm, FormEvent, InputBlur } from "../types";
import { RootState } from "../store";
import { useSignupAccount } from "../hooks";
import { AuthForm, NavigateText, NavigateIcon } from "../components";

const emailSchema = z
    .string()
    .min(5, "email is too short")
    .max(254, "email is too long")
    .email("invalid email format")
    .refine((val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "email must include a domain (e.g. .com)",
    });

const usernameSchema = z
    .string()
    .min(3, "username must be at least 3 characters")
    .max(20, "username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "only letters, numbers, and underscores allowed")
    .refine((val: string) => !/^_/.test(val) && !/_$/.test(val), {
        message: "username cannot start or end with underscore",
    });

const passwordSchema = z
    .string()
    .min(8, "password must contain at least 8 characters")
    .regex(/[A-Z]/, "must contain an uppercase letter")
    .regex(/[0-9]/, "must contain a number")
    .regex(/[^A-Za-z0-9]/, "must contain a symbol");

export default function SignupPage() {
    const [formInfo, setFormInfo] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [formError, setFormError] = useState({
        emailError: "",
        usernameError: "",
        passwordError: "",
    });
    const authToken = useSelector((state: RootState) => state.authToken);

    const { signupAccount, signupLoading, signupSuccess, signupError } =
        useSignupAccount(formInfo, formError, setFormError);

    const handleInputChange = (e: FormEvent) => {
        setFormInfo((state: RegisterForm) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const handleInputBlur = (e: InputBlur) => {
        switch (e.target.name) {
            case "email":
                setFormError((prev) => ({
                    ...prev,
                    emailError:
                        emailSchema.safeParse(formInfo.email).error?.errors[0]
                            ?.message || "",
                }));
                break;
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
