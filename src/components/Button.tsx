type ButtonProps = {
    onClick?: VoidFunction;
    label: string;
};

export default function Button({ onClick, label }: ButtonProps) {
    return (
        <button
            onClick={() => onClick?.()}
            className="rounded border border-[#009963] bg-transparent px-4 py-2 font-semibold text-[#009963] hover:cursor-pointer hover:border-transparent hover:bg-[#009963] hover:text-white"
        >
            {label}
        </button>
    );
}
