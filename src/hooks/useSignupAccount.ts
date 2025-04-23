import { useNavigate } from "react-router";

import { RegisterForm, FormSubmit } from "../types";
import { emailSchema, usernameSchema, passwordSchemaSignup } from "../schemas";
import { useRegisterAccountMutation } from "../features/apiSlice";

export default function useSignupAccount(
    formInfo: RegisterForm,
    setFormError: React.Dispatch<
        React.SetStateAction<{
            emailError: string;
            usernameError: string;
            passwordError: string;
            passwordVerifyError: string;
        }>
    >,
) {
    const navigate = useNavigate();

    const [
        registerAccount,
        {
            isLoading: signupLoading,
            isSuccess: signupSuccess,
            isError: signupError,
        },
    ] = useRegisterAccountMutation();

    const signupAccount = async (e: FormSubmit) => {
        e.preventDefault();

        const emailError =
            emailSchema.safeParse(formInfo.email).error?.errors[0]?.message ||
            "";
        const usernameError =
            usernameSchema.safeParse(formInfo.username).error?.errors[0]
                ?.message || "";
        const passwordError =
            passwordSchemaSignup.safeParse(formInfo.password).error?.errors[0]
                ?.message || "";

        const passwordVerifyError =
            formInfo.password === formInfo.passwordVerify
                ? ""
                : "passwords must match";

        setFormError({
            emailError,
            usernameError,
            passwordError,
            passwordVerifyError,
        });

        if (emailError || usernameError || passwordError || passwordVerifyError)
            return;

        try {
            await registerAccount(formInfo).unwrap();
            navigate("/confirmation");
        } catch (error: unknown) {
            console.error("Account registration failed: ", error);
        }
    };

    return { signupAccount, signupLoading, signupSuccess, signupError };
}
