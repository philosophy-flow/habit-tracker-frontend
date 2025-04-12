type StreakVisualProps = {
    isChecked: boolean;
};

export default function StreakVisual({ isChecked }: StreakVisualProps) {
    return (
        <figure>
            <figcaption className="mb-2 text-sm leading-[normal] text-[#999]">
                streak — 2 days
            </figcaption>
            <ul className="flex">
                <li className="mr-2.5 h-[22px] w-[30px] rounded-lg bg-[#009963]"></li>
                <li className="mr-2.5 h-[22px] w-[30px] rounded-lg bg-[#2E2E2E]"></li>
                <li className="mr-2.5 h-[22px] w-[30px] rounded-lg bg-[#009963]"></li>
                <li className="mr-2.5 h-[22px] w-[30px] rounded-lg bg-[#2E2E2E]"></li>
                <li className="mr-2.5 h-[22px] w-[30px] rounded-lg bg-[#2E2E2E]"></li>
                <li className="mr-2.5 h-[22px] w-[30px] rounded-lg bg-[#009963]"></li>
                <li
                    className={`mr-2.5 h-[22px] w-[30px] rounded-lg bg-[#2E2E2E] transition duration-150 ease-out ${isChecked && "bg-[#009963]"}`}
                ></li>
            </ul>
        </figure>
    );
}
