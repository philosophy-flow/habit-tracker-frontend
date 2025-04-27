import { HeaderProps } from "./types";

export default function Header({ label }: HeaderProps) {
    return (
        <>
            <h1 className="text-xl font-bold">{label}</h1>
        </>
    );
}
