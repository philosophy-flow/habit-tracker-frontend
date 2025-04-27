import { FormEvent, FormSubmit, InputBlur } from "../types";

export type AuthFormProps = {
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
        passwordVerify?: string;
        emailError?: string;
        usernameError: string;
        passwordError: string;
        passwordVerifyError?: string;
    };
    handlers: {
        handleInputChange: (e: FormEvent) => void;
        handleInputBlur: (e: InputBlur) => void;
        handleFormSubmit: (e: FormSubmit) => void;
    };
};

export type AuthInputProps = {
    name: string;
    label?: string;
    value?: string;
    error?: string;
    handlers: {
        handleChange: (e: FormEvent) => void;
        handleBlur: (e: InputBlur) => void;
    };
    type?: string;
};

export type ButtonProps = {
    onClick?: VoidFunction;
    label: string;
    variant?: string;
    className?: string;
    to?: string;
};

export type FrequencyButtonProps = {
    frequency: string[];
    day: string;
    label: string;
    updateFrequency: (day: string) => void;
};

export type FrequencyPickerProps = {
    updateFrequency: (day: string) => void;
    frequency: string[];
};

export type HeaderProps = {
    label: string;
};

export type NavigateIconProps = {
    navigateTo: string;
};

export type NavigateTextProps = {
    helperText: string;
    anchorText: string;
    path: string;
};

export type StreakVisualProps = {
    isChecked: boolean;
    prevSixComplete: boolean[];
    completionStreak: number;
    inactive: boolean;
};
