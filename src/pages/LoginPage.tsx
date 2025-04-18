import { useState } from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

import { LoginForm, FormEvent, InputBlur } from "../types.ts";
import { usernameSchema, passwordSchemaLogin } from "../schemas.ts";
import { RootState } from "../store.ts";
import { useLoginAccount } from "../hooks";
import { AuthForm, NavigateText, NavigateIcon } from "../components";

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
                        passwordSchemaLogin.safeParse(formInfo.password).error
                            ?.errors[0]?.message || "",
                }));
                break;
            default:
                return;
        }
    };

    const authState = {
        isLoading: loginLoading,
        isSuccess: loginSuccess,
        isError: loginError,
        loadingMessage: "Verifying ...",
        successMessage: "You successfully logged in.",
        errorMessage: "Authentication failed; please try again.",
    };
    const handlers = {
        handleInputChange,
        handleInputBlur,
        handleFormSubmit: handleLogin,
    };

    return authToken ? (
        <Navigate to="/habits" />
    ) : (
        <>
            <NavigateIcon navigateTo="" />
            <AuthForm
                type={"login"}
                authState={authState}
                formState={{ ...formInfo, ...formError }}
                handlers={handlers}
            />
            <NavigateText
                helperText="Need an account?"
                anchorText="Signup"
                path="signup"
            />
        </>
    );
}
