import { NavigateTextProps } from "./types";
import { Link } from "react-router-dom";

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
                className="underline focus-visible:border-b-2 focus-visible:border-[#FF4D8D] focus-visible:no-underline focus-visible:outline-none"
                tabIndex={0}
            >
                {anchorText}
            </Link>
        </>
    );
}
