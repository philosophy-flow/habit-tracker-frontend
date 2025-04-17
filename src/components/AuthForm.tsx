import { FormEvent, FormSubmit, InputBlur } from "../types";
import { Button, Header } from "./";

type AuthFormType = "signup" | "login";

type AuthFormProps = {
    type: AuthFormType;
    isError: boolean;
    errorMessage: string;
    isLoading: boolean;
    loadingMessage: string;
    isSuccess: boolean;
    successMessage: string;
    handleInputChange: (e: FormEvent) => void;
    handleInputBlur: (e: InputBlur) => void;
    handleFormSubmit: (e: FormSubmit) => void;
    formInfo: {
        email?: string;
        username: string;
        password: string;
    };
    formError: {
        emailError?: string;
        usernameError: string;
        passwordError: string;
    };
};

export default function AuthForm({
    type,
    isError,
    errorMessage,
    isLoading,
    loadingMessage,
    isSuccess,
    successMessage,
    handleInputChange,
    handleInputBlur,
    handleFormSubmit,
    formInfo,
    formError,
}: AuthFormProps) {
    return (
        <>
            <Header label={type.toUpperCase()} />
            {!isSuccess && (
                <form onSubmit={(e) => handleFormSubmit(e)}>
                    {type == "signup" && (
                        <div className="my-7">
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-lg bg-[#2E2E2E] p-2.5 text-sm focus-visible:ring-2 focus-visible:ring-[#FF4D8D] focus-visible:outline-none"
                                    onChange={(e) => handleInputChange(e)}
                                    onBlur={(e) => handleInputBlur(e)}
                                    id="email-field"
                                    name="email"
                                    value={formInfo.email}
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
                            {formError.emailError && (
                                <small className="p-1 text-red-500">
                                    {formError.emailError}
                                </small>
                            )}
                        </div>
                    )}

                    <div className="my-7">
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-lg bg-[#2E2E2E] p-2.5 text-sm focus-visible:ring-2 focus-visible:ring-[#FF4D8D] focus-visible:outline-none"
                                onChange={(e) => handleInputChange(e)}
                                onBlur={(e) => handleInputBlur(e)}
                                id="username-field"
                                name="username"
                                value={formInfo.username}
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
                        {formError.usernameError && (
                            <small className="p-1 text-red-500">
                                {formError.usernameError}
                            </small>
                        )}
                    </div>

                    <div className="my-7">
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-lg bg-[#2E2E2E] p-2.5 text-sm focus-visible:ring-2 focus-visible:ring-[#FF4D8D] focus-visible:outline-none"
                                onChange={(e) => handleInputChange(e)}
                                onBlur={(e) => handleInputBlur(e)}
                                id="password-field"
                                name="password"
                                value={formInfo.password}
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
                        {formError.passwordError && (
                            <small className="p-1 text-red-500">
                                {formError.passwordError}
                            </small>
                        )}
                    </div>

                    <hr className="mb-7 border-2 border-[#2E2E2E]" />

                    <Button label="Submit" className="mb-2" />

                    {isError && (
                        <div className="mb-7">
                            <p>{errorMessage}</p>
                        </div>
                    )}
                </form>
            )}

            {isLoading && (
                <div>
                    <p>{loadingMessage}</p>
                </div>
            )}

            {isSuccess && (
                <div>
                    <p>{successMessage}</p>
                </div>
            )}
        </>
    );
}
