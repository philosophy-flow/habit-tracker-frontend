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
import { getDateObj } from "../utils";
import { Button, Header, HabitCard, NavigateIcon } from "../components";

type HabitsPageProps = {
    inactive?: boolean;
};

export default function HabitsPage({ inactive = false }: HabitsPageProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const habits = useSelector((state: RootState) => state.habits);
    const today = getDateObj();

    const activeHabits = habits.filter((habit) =>
        habit.frequency.includes(today.day),
    );
    const inactiveHabits = habits.filter(
        (habit) => !habit.frequency.includes(today.day),
    );

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

    const pageConfig = {
        title: inactive ? "INACTIVE HABITS" : "HABITS",
        renderHabits: inactive ? inactiveHabits : activeHabits,
    };

    return (
        <>
            {inactive && <NavigateIcon navigateTo="habits" />}
            <Header label={pageConfig.title} />
            <ul className="my-7">
                {pageConfig.renderHabits.map((habit: Habit, index: number) => (
                    <li key={index}>
                        <HabitCard
                            key={index}
                            id={habit.habit_id}
                            name={habit.name}
                            frequency={habit.frequency}
                            datesCompleted={habit.dates_completed}
                            createdAt={habit.created_at}
                            inactive={inactive}
                            toggleComplete={toggleComplete}
                            handleEdit={() =>
                                navigate(`/edit-habit/${habit.habit_id}`)
                            }
                        />
                    </li>
                ))}
            </ul>
            {!inactive && (
                <div>
                    <Button
                        onClick={() => navigate("/add-habit")}
                        label="+ Add Habit"
                    />
                    <Button
                        onClick={() => navigate("/habits/inactive")}
                        label="View Inactive Habits"
                        variant="tertiary"
                        className="mb-7"
                    />
                    <hr className="mb-7 border-2 border-[#2E2E2E]" />
                    <Button
                        onClick={handleSignout}
                        label="Sign Out"
                        variant="dark"
                    />
                </div>
            )}
        </>
    );
}
