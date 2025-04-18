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

    const username = useSelector(
        (state: RootState) => state.currentUser.username,
    );
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
        title: inactive
            ? "INACTIVE HABITS"
            : `${username.toUpperCase()}'S HABITS`,
        renderHabits: inactive ? inactiveHabits : activeHabits,
    };

    return (
        <>
            {inactive && <NavigateIcon navigateTo="habits" />}
            <Header label={pageConfig.title} />
            <hr className="my-7 border-2 border-[#2E2E2E]" />
            {pageConfig.renderHabits.length > 0 ? (
                <ul className="mb-7">
                    {pageConfig.renderHabits.map((habit: Habit) => (
                        <li key={habit.habit_id}>
                            <HabitCard
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
            ) : (
                <p className="mb-7">No habits to display.</p>
            )}

            {!inactive && (
                <div>
                    <Button to="/add-habit" label="+ Add Habit" />
                    <Button
                        to="/habits/inactive"
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
