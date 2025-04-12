type ButtonProps = {
    onClick?: VoidFunction;
    label: string;
    variant?: string;
};

export default function Button({ onClick, label, variant = "" }: ButtonProps) {
    return (
        <button
            onClick={() => onClick?.()}
            className={`mb-3 w-full rounded border ${!variant && "bg-[#009963]"} ${variant === "secondary" && "bg-transparent"} ${variant === "dark" && "border-none bg-[#2E2E2E]"} border-[#009963] px-4 py-2 font-semibold hover:cursor-pointer hover:border-transparent hover:bg-[#009963] hover:text-white focus-visible:border-[#FF4D8D] focus-visible:ring-1 focus-visible:ring-[#FF4D8D] focus-visible:outline-none`}
        >
            {label}
        </button>
    );
}
