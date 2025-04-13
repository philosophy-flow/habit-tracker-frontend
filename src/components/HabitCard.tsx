import { useState } from "react";

import { generateCompletionArr, calculateStreak } from "../utils";
import StreakVisual from "./StreakVisual";

type HabitCardProps = {
    id: string;
    name: string;
    frequency: string[];
    datesCompleted: string[];
    createdAt: string;
    toggleComplete: (id: string) => void;
    handleEdit?: () => void;
};

export default function HabitCard({
    id,
    name,
    frequency,
    datesCompleted,
    createdAt,
    toggleComplete,
    handleEdit,
}: HabitCardProps) {
    const [isChecked, setIsChecked] = useState(
        datesCompleted.includes(new Date().toLocaleDateString("en-CA")),
    );

    const handleChecked = () => {
        setIsChecked((prev) => !prev);
        toggleComplete(id);
    };

    const prevSixComplete = generateCompletionArr(datesCompleted, frequency);
    const completionStreak = calculateStreak(
        datesCompleted,
        frequency,
        createdAt,
    );

    return (
        <article
            className={`my-4 rounded border-2 border-[#2E2E2E] p-2 transition duration-150 ease-out ${isChecked && "border-[#009963] shadow-[0_0_10px_rgba(0,153,99,0.4)]"}`}
        >
            <div
                className={`align-to flex justify-between border-b-2 border-[#2E2E2E] pb-3 transition duration-150 ease-out ${isChecked && "border-[#009963]"}`}
            >
                <div>
                    <h2
                        className={`leading-[normal] ${isChecked ? "line-through" : ""}`}
                    >
                        {name}
                    </h2>
                    <div className="mt-2.5 flex items-center">
                        <nav>
                            <button
                                onClick={handleEdit}
                                className="mr-2 rounded border-2 border-[#63B3B2] px-3 py-1 text-sm focus-visible:border-[#FF4D8D] focus-visible:ring-1 focus-visible:ring-[#FF4D8D] focus-visible:outline-none"
                            >
                                edit
                            </button>
                        </nav>
                    </div>
                </div>
                <div className="relative">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleChecked}
                        className="peer relative h-[20px] w-[20px] appearance-none rounded border-2 border-[#2E2E2E] transition duration-150 ease-out checked:bg-[#009963] focus-visible:ring-2 focus-visible:ring-[#FF4D8D] focus-visible:outline-none"
                    />
                    <svg
                        className="pointer-events-none absolute top-[10px] left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition duration-150 ease-out peer-checked:opacity-100"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                    >
                        <path
                            d="M5 12L10 17L20 7"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
            <div className="pt-2">
                <StreakVisual
                    isChecked={isChecked}
                    prevSixComplete={prevSixComplete}
                    completionStreak={completionStreak}
                />
            </div>
        </article>
    );
}
