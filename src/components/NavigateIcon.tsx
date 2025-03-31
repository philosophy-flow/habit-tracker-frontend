import { useNavigate } from "react-router";

type NavigateIconProps = {
    navigateTo: string;
};

export default function NavigateIcon({ navigateTo }: NavigateIconProps) {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(`/${navigateTo}`)}
            className="mb-3 flex items-center justify-center rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-[#FF4D8D] focus:outline-none"
            aria-label={`navigate to ${navigateTo}`}
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
        </button>
    );
}
