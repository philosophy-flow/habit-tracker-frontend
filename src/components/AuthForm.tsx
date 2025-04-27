import { AuthFormProps } from "./types";
import { Button, Header, AuthInput } from "./";

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
                        type="password"
                    />
                    {type === "signup" && (
                        <AuthInput
                            name="passwordVerify"
                            label="verify password"
                            value={formState.passwordVerify}
                            error={formState.passwordVerifyError}
                            handlers={{
                                handleChange: handlers.handleInputChange,
                                handleBlur: handlers.handleInputBlur,
                            }}
                            type="password"
                        />
                    )}
                    <hr className="mb-7 border-2 border-[#2E2E2E]" />
                    <Button label="Submit" className="mb-2" />
                    {authState.isError && (
                        <p className="text-red-500">{authState.errorMessage}</p>
                    )}
                    {authState.isLoading && <p>{authState.loadingMessage}</p>}
                    {authState.isSuccess && <p>{authState.successMessage}</p>}
                </form>
            )}
        </>
    );
}
