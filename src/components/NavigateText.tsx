import { useNavigate } from "react-router";

type NavigateTextProps = {
    helperText: string;
    anchorText: string;
    path: string;
};

export default function HelperText({
    path,
    helperText,
    anchorText,
}: NavigateTextProps) {
    const navigate = useNavigate();

    return (
        <>
            <br />
            <p>{helperText}</p>
            <a onClick={() => navigate(`/${path}`)} className="underline">
                {anchorText}
            </a>
        </>
    );
}
