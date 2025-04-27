import { NavigateIconProps } from "./types";
import { Link } from "react-router";

export default function NavigateIcon({ navigateTo }: NavigateIconProps) {
    return (
        <Link
            to={`/${navigateTo}`}
            className="mb-3.5 flex w-fit rounded-full focus-visible:ring-2 focus-visible:ring-[#FF4D8D] focus-visible:outline-none"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
        </Link>
    );
}
