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
                    className="my-2 rounded border border-[#009963] p-2"
                    onSubmit={(e) => handleFormSubmit(e)}
                >
                    {type == "signup" && (
                        <>
                            <label htmlFor="email-field">Email:</label>
                            <input
                                className="g-gray-50 focus:border-red focus:ring-red mb-4 block w-full rounded-lg border border-[#009963] p-2.5 text-sm"
                                onChange={(e) => handleFormInput(e)}
                                id="email-field"
                                name="email"
                                type="text"
                            />
                        </>
                    )}
                    <label htmlFor="username-field">Username:</label>
                    <input
                        className="g-gray-50 focus:border-red focus:ring-red mb-4 block w-full rounded-lg border border-[#009963] p-2.5 text-sm"
                        onChange={(e) => handleFormInput(e)}
                        id="username-field"
                        name="username"
                        type="text"
                    />

                    <label htmlFor="password-field">Password:</label>
                    <input
                        className="g-gray-50 focus:border-red focus:ring-red mb-4 block w-full rounded-lg border border-[#009963] p-2.5 text-sm"
                        onChange={(e) => handleFormInput(e)}
                        id="password-field"
                        name="password"
                        type="password"
                    />

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
