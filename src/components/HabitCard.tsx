import StreakVisual from "./StreakVisual";

type HabitCardProps = {
    name: string;
    datesCompleted: string[];
    frequency: string[];
    handleToggle?: () => void;
    handleEdit?: () => void;
};

export default function HabitCard({
    name = "",
    datesCompleted = [],
    frequency = [],
    handleToggle,
    handleEdit,
}: HabitCardProps) {
    return (
        <article className="my-4 rounded border-2 border-[#2E2E2E] p-2">
            <div className="flex justify-between border-b-2 border-[#2E2E2E] pb-2 align-top">
                <div>
                    <h2 className="leading-[normal]">{name}</h2>
                    <div className="mt-2.5 flex items-center">
                        <nav>
                            <button
                                onClick={handleEdit}
                                className="mr-2 rounded border-2 border-[#D35400] px-3 py-1 text-sm"
                            >
                                edit
                            </button>
                            <button className="mr-2 rounded border-2 border-[#8E44AD] px-3 py-1 text-sm">
                                stats
                            </button>
                        </nav>
                    </div>
                </div>
                <div className="relative">
                    <input
                        type="checkbox"
                        name=""
                        id=""
                        className="peer relative h-[20px] w-[20px] appearance-none rounded border-2 border-[#2E2E2E] outline-0 transition duration-150 ease-out checked:bg-[#009963]"
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
                <StreakVisual />
            </div>
        </article>
    );
}
