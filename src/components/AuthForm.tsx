import { FormEvent, FormSubmit, InputBlur } from "../types";
import { Button, Header } from "./";

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
                    {type == "signup" && (
                        <div className="my-7">
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-lg bg-[#2E2E2E] p-2.5 text-sm focus-visible:ring-2 focus-visible:ring-[#FF4D8D] focus-visible:outline-none"
                                    onChange={(e) =>
                                        handlers.handleInputChange(e)
                                    }
                                    onBlur={(e) => handlers.handleInputBlur(e)}
                                    id="email-field"
                                    name="email"
                                    value={formState.email}
                                    type="text"
                                    placeholder=" "
                                />
                                <label
                                    className="absolute bottom-0 py-2 pl-3 text-[#999] duration-100 ease-linear peer-not-placeholder-shown:bottom-10 peer-not-placeholder-shown:p-1 peer-not-placeholder-shown:text-sm peer-focus-visible:bottom-10 peer-focus-visible:p-1 peer-focus-visible:text-sm"
                                    htmlFor="email-field"
                                >
                                    email
                                </label>
                            </div>
                            {formState.emailError && (
                                <small className="p-1 text-red-500">
                                    {formState.emailError}
                                </small>
                            )}
                        </div>
                    )}

                    <div className="my-7">
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-lg bg-[#2E2E2E] p-2.5 text-sm focus-visible:ring-2 focus-visible:ring-[#FF4D8D] focus-visible:outline-none"
                                onChange={(e) => handlers.handleInputChange(e)}
                                onBlur={(e) => handlers.handleInputBlur(e)}
                                id="username-field"
                                name="username"
                                value={formState.username}
                                type="text"
                                placeholder=" "
                            />
                            <label
                                className="absolute bottom-0 py-2 pl-3 text-[#999] duration-100 ease-linear peer-not-placeholder-shown:bottom-10 peer-not-placeholder-shown:p-1 peer-not-placeholder-shown:text-sm peer-focus-visible:bottom-10 peer-focus-visible:p-1 peer-focus-visible:text-sm"
                                htmlFor="username-field"
                            >
                                username
                            </label>
                        </div>
                        {formState.usernameError && (
                            <small className="p-1 text-red-500">
                                {formState.usernameError}
                            </small>
                        )}
                    </div>

                    <div className="my-7">
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-lg bg-[#2E2E2E] p-2.5 text-sm focus-visible:ring-2 focus-visible:ring-[#FF4D8D] focus-visible:outline-none"
                                onChange={(e) => handlers.handleInputChange(e)}
                                onBlur={(e) => handlers.handleInputBlur(e)}
                                id="password-field"
                                name="password"
                                value={formState.password}
                                type="password"
                                placeholder=" "
                            />
                            <label
                                className="absolute bottom-0 py-2 pl-3 text-[#999] duration-100 ease-linear peer-not-placeholder-shown:bottom-10 peer-not-placeholder-shown:p-1 peer-not-placeholder-shown:text-sm peer-focus-visible:bottom-10 peer-focus-visible:p-1 peer-focus-visible:text-sm"
                                htmlFor="password-field"
                            >
                                password
                            </label>
                        </div>
                        {formState.passwordError && (
                            <small className="p-1 text-red-500">
                                {formState.passwordError}
                            </small>
                        )}
                    </div>

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
