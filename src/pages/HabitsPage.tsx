import { useSelector } from "react-redux";

import { Habit } from "../types";
import { RootState } from "../store";
import { useHandleSignout } from "../hooks";
import { Button, Header, HabitCard } from "../components";

export default function HabitsPage() {
    const habits = useSelector((state: RootState) => state.habits);
    const handleSignout = useHandleSignout();

    const toggleComplete = () => {
        console.log("toggling habit");
    };

    return (
        <>
            <Header label="Habits" />
            <ul className="my-4">
                {habits.map((habit: Habit, index: number) => (
                    <li key={index}>
                        <HabitCard
                            key={index}
                            name={habit.name}
                            datesCompleted={habit.dates_completed}
                            frequency={habit.frequency}
                            toggleComplete={toggleComplete}
                        />
                    </li>
                ))}
            </ul>
            <Button label="+ Add Habit" variant="secondary " />
            <Button onClick={handleSignout} label="Sign Out" variant="dark" />
        </>
    );
}
