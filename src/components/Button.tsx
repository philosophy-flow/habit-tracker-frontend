type ButtonProps = {
    onClick?: VoidFunction;
    label: string;
    variant?: string;
};

export default function Button({ onClick, label, variant = "" }: ButtonProps) {
    const variantSecondary = variant === "secondary" ? "bg-transparent " : "";
    const variantDark = variant === "dark" ? "border-none bg-[#2E2E2E] " : "";

    const additionalStyles = !variant
        ? "bg-[#009963]"
        : variantSecondary + variantDark;

    return (
        <button
            onClick={() => onClick?.()}
            className={`mb-3 w-full rounded border border-[#009963] px-4 py-2 font-semibold hover:cursor-pointer hover:border-transparent hover:bg-[#009963] hover:text-white focus-visible:border-[#FF4D8D] focus-visible:ring-1 focus-visible:ring-[#FF4D8D] focus-visible:outline-none ${additionalStyles}`}
        >
            {label}
        </button>
    );
}
