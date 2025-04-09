import { FormEvent, FormSubmit } from "../types";
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
    handleFormInput: (e: FormEvent) => void;
    handleFormSubmit: (e: FormSubmit) => void;
};

export default function AuthForm({
    type,
    isError,
    errorMessage,
    isLoading,
    loadingMessage,
    isSuccess,
    successMessage,
    handleFormInput,
    handleFormSubmit,
}: AuthFormProps) {
    return (
        <>
            <Header label={type.toUpperCase()} />
            {isError && (
                <div>
                    <p>{errorMessage}</p>
                </div>
            )}
            {!isSuccess && (
                <form
                    className="my-4 rounded border border-[#009963] px-2"
                    onSubmit={(e) => handleFormSubmit(e)}
                >
                    {type == "signup" && (
                        <div className="relative my-7">
                            <input
                                className="peer block w-full rounded-lg bg-[#2E2E2E] p-2.5 text-sm focus:ring-2 focus:ring-[#FF4D8D] focus:outline-none"
                                onChange={(e) => handleFormInput(e)}
                                id="email-field"
                                name="email"
                                type="text"
                                placeholder=" "
                            />
                            <label
                                className="absolute bottom-0 py-2 pl-3 text-[#999] duration-100 ease-linear peer-not-placeholder-shown:bottom-10 peer-not-placeholder-shown:p-1 peer-not-placeholder-shown:text-sm peer-focus:bottom-10 peer-focus:p-1 peer-focus:text-sm"
                                htmlFor="email-field"
                            >
                                email
                            </label>
                        </div>
                    )}
                    <div className="relative my-7">
                        <input
                            className="peer block w-full rounded-lg bg-[#2E2E2E] p-2.5 text-sm focus:ring-2 focus:ring-[#FF4D8D] focus:outline-none"
                            onChange={(e) => handleFormInput(e)}
                            id="username-field"
                            name="username"
                            type="text"
                            placeholder=" "
                        />
                        <label
                            className="absolute bottom-0 py-2 pl-3 text-[#999] duration-100 ease-linear peer-not-placeholder-shown:bottom-10 peer-not-placeholder-shown:p-1 peer-not-placeholder-shown:text-sm peer-focus:bottom-10 peer-focus:p-1 peer-focus:text-sm"
                            htmlFor="username-field"
                        >
                            username
                        </label>
                    </div>

                    <div className="relative my-7">
                        <input
                            className="peer block w-full rounded-lg bg-[#2E2E2E] p-2.5 text-sm focus:ring-2 focus:ring-[#FF4D8D] focus:outline-none"
                            onChange={(e) => handleFormInput(e)}
                            id="password-field"
                            name="password"
                            type="password"
                            placeholder=" "
                        />
                        <label
                            className="absolute bottom-0 py-2 pl-3 text-[#999] duration-100 ease-linear peer-not-placeholder-shown:bottom-10 peer-not-placeholder-shown:p-1 peer-not-placeholder-shown:text-sm peer-focus:bottom-10 peer-focus:p-1 peer-focus:text-sm"
                            htmlFor="password-field"
                        >
                            password
                        </label>
                    </div>

                    <Button label="Submit" />
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
