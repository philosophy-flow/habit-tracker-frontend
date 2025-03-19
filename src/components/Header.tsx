type HeaderProps = {
    label: string;
};

export default function Header({ label }: HeaderProps) {
    return (
        <>
            <h1 className="text-xl font-bold">{label}</h1>
            <hr className="my-4" />
        </>
    );
}
