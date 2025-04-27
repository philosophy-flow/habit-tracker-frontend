import { StreakVisualProps } from "./types";

export default function StreakVisual({
    prevSixComplete,
    isChecked,
    completionStreak,
    inactive,
}: StreakVisualProps) {
    const totalStreak = isChecked ? completionStreak + 1 : completionStreak;
    const onFire =
        prevSixComplete.filter((complete) => complete).length === 6 &&
        isChecked;

    return (
        <figure>
            <figcaption className="mb-1.5 h-[19px] text-sm leading-[normal] text-[#999]">
                streak — {totalStreak} {totalStreak === 1 ? "day" : "days"}{" "}
                {onFire ? "🔥" : ""}
            </figcaption>
            {!inactive && (
                <ul className="flex">
                    {prevSixComplete.map((completed, index) => (
                        <li
                            key={index}
                            className={`mr-2.5 h-[22px] w-[30px] rounded-lg transition duration-150 ease-out ${completed ? "bg-[#009963]" : "bg-[#2E2E2E]"} ${onFire ? "shadow-[0_0_10px_rgba(0,153,99,0.8)]" : ""}`}
                        ></li>
                    ))}
                    <li
                        className={`mr-2.5 h-[22px] w-[30px] rounded-lg bg-[#2E2E2E] transition duration-150 ease-out ${isChecked ? "bg-[#009963]" : ""} ${onFire ? "shadow-[0_0_10px_rgba(0,153,99,0.8)]" : ""}`}
                    ></li>
                </ul>
            )}
        </figure>
    );
}
