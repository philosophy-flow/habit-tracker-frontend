type ButtonProps = {
    onClick?: VoidFunction;
    label: string;
    variant?: string;
};

export default function Button({ onClick, label, variant = "" }: ButtonProps) {
    return (
        <button
            onClick={() => onClick?.()}
            className={`mb-3 w-full rounded border ${variant === "secondary" ? "bg-transparent" : "bg-[#009963]"} border-[#009963] px-4 py-2 font-semibold hover:cursor-pointer hover:border-transparent hover:bg-[#009963] hover:text-white focus:border-[#FF4D8D] focus:ring-1 focus:ring-[#FF4D8D] focus:outline-none`}
        >
            {label}
        </button>
    );
}
