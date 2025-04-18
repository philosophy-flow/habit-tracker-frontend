import { FormEvent, FormSubmit, InputBlur } from "../types";
import { Button, Header, AuthInput } from "./";

type AuthFormProps = {
    type: "signup" | "login";
    authState: {
        isLoading: boolean;
        loadingMessage: string;
        isSuccess: boolean;
        successMessage: string;
        isError: boolean;
        errorMessage: string;
    };
    formState: {
        email?: string;
        username: string;
        password: string;
        emailError?: string;
        usernameError: string;
        passwordError: string;
    };
    handlers: {
        handleInputChange: (e: FormEvent) => void;
        handleInputBlur: (e: InputBlur) => void;
        handleFormSubmit: (e: FormSubmit) => void;
    };
};

export default function AuthForm({
    type,
    authState,
    formState,
    handlers,
}: AuthFormProps) {
    return (
        <>
            <Header label={type.toUpperCase()} />
            {!authState.isSuccess && (
                <form onSubmit={(e) => handlers.handleFormSubmit(e)}>
                    {type === "signup" && (
                        <AuthInput
                            name="email"
                            value={formState.email}
                            error={formState.emailError}
                            handlers={{
                                handleChange: handlers.handleInputChange,
                                handleBlur: handlers.handleInputBlur,
                            }}
                        />
                    )}
                    <AuthInput
                        name="username"
                        value={formState.username}
                        error={formState.usernameError}
                        handlers={{
                            handleChange: handlers.handleInputChange,
                            handleBlur: handlers.handleInputBlur,
                        }}
                    />
                    <AuthInput
                        name="password"
                        value={formState.password}
                        error={formState.passwordError}
                        handlers={{
                            handleChange: handlers.handleInputChange,
                            handleBlur: handlers.handleInputBlur,
                        }}
                    />
                    <hr className="mb-7 border-2 border-[#2E2E2E]" />
                    <Button label="Submit" className="mb-2" />
                    {authState.isError && <p>{authState.errorMessage}</p>}
                    {authState.isLoading && <p>{authState.loadingMessage}</p>}
                    {authState.isSuccess && <p>{authState.successMessage}</p>}
                </form>
            )}
        </>
    );
}
