import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";

import { FormEvent, InputBlur } from "../types.ts";
import { habitSchema } from "../schemas";
import {
    useUpdateHabitMutation,
    useAddHabitMutation,
    useLazyGetHabitsQuery,
    setHabits,
} from "../features";
import { RootState } from "../store";
import {
    NavigateIcon,
    Header,
    Button,
    FrequencyPicker,
    AuthInput,
} from "../components";

type HabitModPageTypes = {
    title: string;
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function HabitModPage({ title }: HabitModPageTypes) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const habits = useSelector((state: RootState) => state.habits);

    const habit = habits.find((h) => h.habit_id === id) || {
        name: "",
        frequency: weekdays,
    };

    const [habitName, setHabitName] = useState(habit.name);
    const [nameError, setNameError] = useState("");
    const [habitFrequencyType, setHabitFrequencyType] = useState(
        habit.frequency.length === 7 ? "daily" : "specific",
    );
    const [habitFrequencyDetail, setHabitFrequencyDetail] = useState(
        habit.frequency,
    );

    const [addHabit] = useAddHabitMutation();
    const [updateHabit] = useUpdateHabitMutation();
    const [getHabits] = useLazyGetHabitsQuery();

    const handleNameChange = (e: FormEvent) => {
        e.preventDefault();
        setHabitName(e.target.value);
    };

    const handleNameBlur = (e: InputBlur) => {
        e.preventDefault();
        setNameError(
            habitSchema.safeParse(e.target.value).error?.errors[0]?.message ||
                "",
        );
    };

    const handleChangeFrequency = (day: string) => {
        if (habitFrequencyDetail.includes(day)) {
            setHabitFrequencyDetail((prev) =>
                prev.filter((dayIncluded) => dayIncluded !== day),
            );
        } else {
            setHabitFrequencyDetail((prev) => [...prev, day]);
        }
    };

    const handleUpdateHabit = async () => {
        const zodNameError =
            habitSchema.safeParse(habitName).error?.errors[0]?.message || "";

        setNameError(zodNameError);

        if (zodNameError) return;

        const duplicateExists = habits.some(
            (habit) => habitName === habit.name && id !== habit.habit_id,
        );

        if (duplicateExists) {
            setNameError("there is already a habit with this name");
            return;
        }

        const finalFrequency =
            habitFrequencyType === "daily" ? weekdays : habitFrequencyDetail;

        if (id) {
            await updateHabit({
                id,
                name: habitName,
                frequency: finalFrequency,
            });

            const refreshedHabits = await getHabits().unwrap();
            dispatch(setHabits(refreshedHabits));
        }
        navigate("/habits");
    };

    const handleAddHabit = async () => {
        const zodNameError =
            habitSchema.safeParse(habitName).error?.errors[0]?.message || "";

        setNameError(zodNameError);

        if (zodNameError) return;

        const existingNames = habits.map((h) => h.name);
        if (existingNames.includes(habitName)) {
            setNameError("there is already a habit with this name");
            return;
        }

        const finalFrequency =
            habitFrequencyType === "daily" ? weekdays : habitFrequencyDetail;

        await addHabit({ name: habitName, frequency: finalFrequency });

        const refreshedHabits = await getHabits().unwrap();
        dispatch(setHabits(refreshedHabits));

        navigate("/habits");
    };

    return (
        <div>
            <NavigateIcon navigateTo="habits" />
            <Header label={title} />
            <AuthInput
                name="name"
                value={habitName}
                error={nameError}
                handlers={{
                    handleChange: handleNameChange,
                    handleBlur: handleNameBlur,
                }}
            />
            <div className="relative my-7">
                <label
                    className="block p-1 text-sm text-[#999] duration-100 ease-linear"
                    htmlFor="frequency-field"
                >
                    frequency
                </label>
                <div
                    className="mb-2 flex cursor-pointer items-center justify-between rounded border-2 border-[#2E2E2E] p-2.5"
                    onClick={() => setHabitFrequencyType("daily")}
                >
                    <label htmlFor="daily" className="text-sm">
                        daily
                    </label>
                    <div className="relative">
                        <input
                            type="radio"
                            name="frequency"
                            id="daily"
                            value="daily"
                            checked={habitFrequencyType === "daily"}
                            onChange={(e) =>
                                setHabitFrequencyType(e.target.value)
                            }
                            className="peer relative h-[20px] w-[20px] appearance-none rounded-full border-2 border-[#2E2E2E] transition duration-150 ease-out checked:border-[#63B3B2] hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FF4D8D] focus-visible:outline-none"
                        />
                        <span className="pointer-events-none absolute top-[10px] left-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-[#63B3B2] opacity-0 transition duration-200 ease-out peer-checked:scale-100 peer-checked:opacity-100"></span>
                    </div>
                </div>
                <div
                    className="mb-4 flex cursor-pointer items-center justify-between rounded border-2 border-[#2E2E2E] p-2.5"
                    onClick={() => setHabitFrequencyType("specific")}
                >
                    <label htmlFor="specific" className="text-sm">
                        specific
                    </label>
                    <div className="relative">
                        <input
                            type="radio"
                            name="frequency"
                            id="specific"
                            value="specific"
                            checked={habitFrequencyType === "specific"}
                            onChange={(e) =>
                                setHabitFrequencyType(e.target.value)
                            }
                            className="peer relative h-[20px] w-[20px] appearance-none rounded-full border-2 border-[#2E2E2E] transition duration-150 ease-out checked:border-[#63B3B2] hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FF4D8D] focus-visible:outline-none"
                        />
                        <span className="pointer-events-none absolute top-[10px] left-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-[#63B3B2] opacity-0 transition duration-200 ease-out peer-checked:scale-100 peer-checked:opacity-100"></span>
                    </div>
                </div>
                {habitFrequencyType === "specific" && (
                    <FrequencyPicker
                        updateFrequency={handleChangeFrequency}
                        frequency={habitFrequencyDetail}
                    />
                )}
            </div>
            <hr className="mb-7 border-2 border-[#2E2E2E]" />
            <Button
                onClick={id ? handleUpdateHabit : handleAddHabit}
                label={`${id ? "Update" : "+ Add"} Habit`}
            />
            {id && (
                <Button
                    onClick={() => navigate(`/edit-habit/${id}/delete`)}
                    label="Delete Habit"
                    variant="dark"
                />
            )}
        </div>
    );
}
