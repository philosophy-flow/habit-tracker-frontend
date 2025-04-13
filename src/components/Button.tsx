type ButtonProps = {
    onClick?: VoidFunction;
    label: string;
    variant?: string;
};

export default function Button({ onClick, label, variant = "" }: ButtonProps) {
    const variantSecondary =
        variant === "secondary" ? "bg-transparent border-[#009963] " : "";
    const variantDark = variant === "dark" ? "border-none bg-[#2E2E2E] " : "";
    const variantDanger =
        variant === "danger" ? "border-[#ff4b4b] bg-transparent " : "";
    const variantTertiary = variant === "tertiary" ? "border-[#63B3B2] " : "";

    const additionalStyles = !variant
        ? "bg-[#009963] border-none "
        : variantSecondary + variantDark + variantDanger + variantTertiary;

    return (
        <button
            onClick={() => onClick?.()}
            className={`mb-3 w-full rounded border-2 px-4 py-2 font-semibold hover:cursor-pointer focus-visible:border-[#FF4D8D] focus-visible:ring-1 focus-visible:ring-[#FF4D8D] focus-visible:outline-none ${additionalStyles}`}
        >
            {label}
        </button>
    );
}
