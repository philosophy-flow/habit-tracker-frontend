import { generateCompletionArr } from "../utils";

type StreakVisualProps = {
    isChecked: boolean;
    datesCompleted: string[];
    frequency: string[];
};

export default function StreakVisual({
    isChecked,
    datesCompleted = [],
    frequency = [],
}: StreakVisualProps) {
    // generate bool arr for completions over last 6 days
    const prevSixComplete = generateCompletionArr(datesCompleted, frequency);

    return (
        <figure>
            <figcaption className="mb-1.5 text-sm leading-[normal] text-[#999]">
                streak — 2 days
            </figcaption>
            <ul className="flex">
                {prevSixComplete.map((completed, index) => (
                    <li
                        key={index}
                        className={`mr-2.5 h-[22px] w-[30px] rounded-lg transition duration-150 ease-out ${completed ? "bg-[#009963]" : "bg-[#2E2E2E]"}`}
                    ></li>
                ))}
                <li
                    className={`mr-2.5 h-[22px] w-[30px] rounded-lg bg-[#2E2E2E] transition duration-150 ease-out ${isChecked && "bg-[#009963]"}`}
                ></li>
            </ul>
        </figure>
    );
}
