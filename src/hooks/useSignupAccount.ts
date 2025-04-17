import { useNavigate } from "react-router";
import { z } from "zod";

import { RegisterForm, FormSubmit } from "../types";
import { useRegisterAccountMutation } from "../features/apiSlice";

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

export default function useSignupAccount(
    formInfo: RegisterForm,
    formError: {
        emailError: string;
        usernameError: string;
        passwordError: string;
    },
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

        setFormError((prev) => ({
            ...prev,
            emailError:
                emailSchema.safeParse(formInfo.email).error?.errors[0]
                    ?.message || "",
        }));

        setFormError((prev) => ({
            ...prev,
            usernameError:
                usernameSchema.safeParse(formInfo.username).error?.errors[0]
                    ?.message || "",
        }));

        setFormError((prev) => ({
            ...prev,
            passwordError:
                passwordSchema.safeParse(formInfo.password).error?.errors[0]
                    ?.message || "",
        }));

        if (
            !formError.emailError &&
            !formError.usernameError &&
            !formError.passwordError
        ) {
            try {
                await registerAccount(formInfo).unwrap();
                navigate("/confirmation");
            } catch (error: unknown) {
                console.error("Account registration failed: ", error);
            }
        }
    };

    return { signupAccount, signupLoading, signupSuccess, signupError };
}
