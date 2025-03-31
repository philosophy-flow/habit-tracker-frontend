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
            <a
                onClick={() => navigate(`/${path}`)}
                className="underline focus:border-b-2 focus:border-[#FF4D8D] focus:no-underline focus:outline-none"
                tabIndex={0}
            >
                {anchorText}
            </a>
        </>
    );
}
