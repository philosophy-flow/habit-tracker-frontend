import { FormEvent, InputBlur } from "../types";
type AuthInputProps = {
    name: string;
    value?: string;
    error?: string;
    handlers: {
        handleChange: (e: FormEvent) => void;
        handleBlur: (e: InputBlur) => void;
    };
    type?: string;
};

export default function AuthInput({
    name,
    value,
    error,
    handlers,
    type = "text",
}: AuthInputProps) {
    return (
        <div className="my-7">
            <div className="relative">
                <input
                    className="peer block w-full rounded-lg bg-[#2E2E2E] p-2.5 text-sm focus-visible:ring-2 focus-visible:ring-[#FF4D8D] focus-visible:outline-none"
                    onChange={(e) => handlers.handleChange(e)}
                    onBlur={(e) => handlers.handleBlur(e)}
                    id={`${name}-field`}
                    name={name}
                    value={value}
                    type={type}
                    placeholder=" "
                />
                <label
                    className="absolute bottom-0 py-2 pl-3 text-[#999] duration-100 ease-linear peer-not-placeholder-shown:bottom-10 peer-not-placeholder-shown:p-1 peer-not-placeholder-shown:text-sm peer-focus-visible:bottom-10 peer-focus-visible:p-1 peer-focus-visible:text-sm"
                    htmlFor="email-field"
                >
                    {name}
                </label>
            </div>
            {error && <small className="p-1 text-red-500">{error}</small>}
        </div>
    );
}
