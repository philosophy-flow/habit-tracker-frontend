import { useNavigate } from "react-router";

import { RegisterForm, FormSubmit } from "../types";
import { useRegisterAccountMutation } from "../features/apiSlice";

export default function useSignupAccount(formInfo: RegisterForm) {
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

        try {
            await registerAccount(formInfo).unwrap();
            navigate("/confirmation");
        } catch (error: unknown) {
            console.error("Account registration failed: ", error);
        }
    };

    return { signupAccount, signupLoading, signupSuccess, signupError };
}
