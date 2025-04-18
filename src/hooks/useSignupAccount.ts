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

        setFormError({ emailError, usernameError, passwordError });

        if (emailError || usernameError || passwordError) return;

        try {
            await registerAccount(formInfo).unwrap();
            navigate("/confirmation");
        } catch (error: unknown) {
            console.error("Account registration failed: ", error);
        }
    };

    return { signupAccount, signupLoading, signupSuccess, signupError };
}
