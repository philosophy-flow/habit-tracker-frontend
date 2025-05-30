export type LoginForm = {
    username: string;
    password: string;
};

export type RegisterForm = {
    email: string;
    username: string;
    password: string;
    passwordVerify: string;
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
    habit_id: string;
    name: string;
    frequency: string[];
    dates_completed: string[];
    created_at: string;
};

export type HabitAdd = {
    name?: string;
    frequency?: string[];
};

export type HabitToggle = {
    id: string;
    date_completed: string;
};

export type HabitUpdate = {
    id: string;
    name?: string;
    frequency?: string[];
};

export type FormEvent = React.ChangeEvent<HTMLInputElement>;
export type InputBlur = React.FocusEvent<HTMLInputElement>;
export type FormSubmit = React.FormEvent<HTMLFormElement>;
