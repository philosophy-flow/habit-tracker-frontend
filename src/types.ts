export type LoginForm = {
    username: string;
    password: string;
};

export type RegisterForm = {
    email: string;
    username: string;
    password: string;
};

export type User = {
    userId: string;
    email: string;
    username: string;
    profileImageUrl: string;
    accountVerified: boolean;
};

export type AuthResponse = {
    access_token: string;
    token_type: string;
};

export type Habit = {
    id: string;
    name: string;
    frequency: string[];
    dates_completed: string[];
};

export type HabitAdd = {
    name: string;
    frequency: string[];
};

export type FormEvent = React.ChangeEvent<HTMLInputElement>;
export type FormSubmit = React.FormEvent<HTMLFormElement>;
