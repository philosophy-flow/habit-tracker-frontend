import { Link } from "react-router-dom";

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
    return (
        <>
            <p>{helperText}</p>
            <Link
                to={`/${path}`}
                className="underline focus:border-b-2 focus:border-[#FF4D8D] focus:no-underline focus:outline-none"
                tabIndex={0}
            >
                {anchorText}
            </Link>
        </>
    );
}
