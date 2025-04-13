import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { Habit, HabitToggle } from "../types";
import { RootState } from "../store";
import {
    useToggleHabitMutation,
    useLazyGetHabitsQuery,
    setHabits,
} from "../features";
import { useHandleSignout } from "../hooks";
import { Button, Header, HabitCard } from "../components";

export default function HabitsPage() {
    const habits = useSelector((state: RootState) => state.habits);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignout = useHandleSignout();
    const [getHabits] = useLazyGetHabitsQuery();
    const [toggleHabit, { isSuccess: toggleIsSuccess }] =
        useToggleHabitMutation();

    useEffect(() => {
        const refreshHabits = async () => {
            if (toggleIsSuccess) {
                const refreshedHabits = await getHabits().unwrap();
                dispatch(setHabits(refreshedHabits));
            }
        };
        refreshHabits();
    }, [getHabits, toggleIsSuccess, dispatch]);

    const toggleComplete = async (id: string) => {
        const today = new Date().toLocaleDateString("en-CA");
        const payload: HabitToggle = { id, date_completed: today };

        await toggleHabit(payload).unwrap();
    };

    return (
        <>
            <Header label="Habits" />
            <ul className="my-4">
                {habits.map((habit: Habit, index: number) => (
                    <li key={index}>
                        <HabitCard
                            key={index}
                            id={habit.habit_id}
                            name={habit.name}
                            frequency={habit.frequency}
                            datesCompleted={habit.dates_completed}
                            createdAt={habit.created_at}
                            toggleComplete={toggleComplete}
                            handleEdit={() => navigate("/edit-habit")}
                        />
                    </li>
                ))}
            </ul>
            <Button
                onClick={() => navigate("/add-habit")}
                label="+ Add Habit"
                variant="secondary"
            />
            <Button onClick={handleSignout} label="Sign Out" variant="dark" />
        </>
    );
}
