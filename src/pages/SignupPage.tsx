import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RegisterForm, FormEvent, InputBlur } from "../types";
import { emailSchema, usernameSchema, passwordSchemaSignup } from "../schemas";
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
                        passwordSchemaSignup.safeParse(formInfo.password).error
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
