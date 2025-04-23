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
        passwordVerify: "",
    });
    const [formError, setFormError] = useState({
        emailError: "",
        usernameError: "",
        passwordError: "",
        passwordVerifyError: "",
    });
    const authToken = useSelector((state: RootState) => state.authToken);

    const { signupAccount, signupLoading, signupSuccess, signupError } =
        useSignupAccount(formInfo, setFormError);

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
            case "passwordVerify":
                setFormError((prev) => ({
                    ...prev,
                    passwordVerifyError:
                        formInfo.password === formInfo.passwordVerify
                            ? ""
                            : "passwords must match",
                }));
                break;
            default:
                return;
        }
    };

    const authState = {
        isLoading: signupLoading,
        isSuccess: signupSuccess,
        isError: signupError,
        loadingMessage: "Submitting ...",
        successMessage: "You successfully created an account.",
        errorMessage: "Account creation failed; please try again.",
    };
    const handlers = {
        handleInputChange,
        handleInputBlur,
        handleFormSubmit: signupAccount,
    };

    return authToken ? (
        <Navigate to="/habits" />
    ) : (
        <>
            <NavigateIcon navigateTo="" />
            <AuthForm
                type={"signup"}
                authState={authState}
                formState={{ ...formInfo, ...formError }}
                handlers={handlers}
            />
            <NavigateText
                helperText="Already have an account?"
                anchorText="Login"
                path="login"
            />
        </>
    );
}
