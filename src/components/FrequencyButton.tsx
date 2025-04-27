import { FrequencyButtonProps } from "./types";

export default function FrequencyButton({
    frequency,
    day,
    label,
    updateFrequency,
}: FrequencyButtonProps) {
    return (
        <li
            className={`mr-2.5 h-[30px] w-[42px] rounded-lg bg-[#2E2E2E] text-center transition duration-150 ease-out ${frequency.includes(day) ? "bg-[#009963]" : ""}`}
        >
            <button
                onClick={() => updateFrequency(day)}
                className="h-full w-full cursor-pointer rounded focus-visible:border-2 focus-visible:border-[#FF4D8D] focus-visible:ring-1 focus-visible:ring-[#FF4D8D] focus-visible:outline-none"
            >
                {label}
            </button>
        </li>
    );
}
