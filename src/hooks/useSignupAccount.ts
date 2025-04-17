import { useNavigate } from "react-router";
import { z } from "zod";

import { RegisterForm, FormSubmit } from "../types";
import { useRegisterAccountMutation } from "../features/apiSlice";

const emailSchema = z
    .string()
    .min(5, "Email is too short")
    .max(254, "Email is too long")
    .email("Invalid email format")
    .refine((val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "Email must include a domain (e.g. .com)",
    });

const usernameSchema = z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed")
    .refine((val: string) => !/^_/.test(val) && !/_$/.test(val), {
        message: "Username cannot start or end with underscore",
    });

const passwordSchema = z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[^A-Za-z0-9]/, "Must contain a symbol");

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
