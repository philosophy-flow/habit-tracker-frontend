import { Link } from "react-router";

type ButtonProps = {
    onClick?: VoidFunction;
    label: string;
    variant?: string;
    className?: string;
    to?: string;
};

export default function Button({
    onClick,
    label,
    variant = "",
    className = "",
    to = "",
}: ButtonProps) {
    const variantSecondary =
        variant === "secondary"
            ? "bg-transparent border-2 border-[#009963] "
            : "";
    const variantDark =
        variant === "dark" ? "bg-[#2E2E2E] border-2 border-transparent " : "";
    const variantDanger =
        variant === "danger" ? "border-2 border-[#ff4b4b] bg-transparent " : "";
    const variantTertiary =
        variant === "tertiary" ? "border-2 border-[#63B3B2] " : "";

    const additionalStyles = !variant
        ? "bg-[#009963] border-2 border-transparent "
        : variantSecondary + variantDark + variantDanger + variantTertiary;

    const buttonStyles = `mb-3 w-full rounded px-4 py-2 font-semibold hover:cursor-pointer focus-visible:border-2 focus-visible:border-[#FF4D8D] focus-visible:ring-1 focus-visible:ring-[#FF4D8D] focus-visible:outline-none ${additionalStyles} ${to ? "block text-center" : ""} ${className}`;

    if (to) {
        return (
            <Link to={to} className={buttonStyles}>
                {label}
            </Link>
        );
    }

    return (
        <button onClick={() => onClick?.()} className={buttonStyles}>
            {label}
        </button>
    );
}
