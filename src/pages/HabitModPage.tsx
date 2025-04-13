import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import { RootState } from "../store";
import { NavigateIcon, Header, Button } from "../components";

type HabitModPageTypes = {
    title: string;
};

export default function HabitModPage({ title }: HabitModPageTypes) {
    const { id } = useParams();
    const habits = useSelector((state: RootState) => state.habits);
    const habit = habits.find((h) => h.habit_id === id) || {
        name: "",
        frequency: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    };

    const [habitName, setHabitName] = useState(habit.name);
    const [habitFrequency, setHabitFrequency] = useState(
        habit.frequency.length === 7 ? "daily" : "specific",
    );

    return (
        <div>
            <NavigateIcon navigateTo="habits" />
            <Header label={title} />
            <div className="relative my-7">
                <input
                    className="peer block w-full rounded-lg bg-[#2E2E2E] p-2.5 text-sm focus-visible:ring-2 focus-visible:ring-[#FF4D8D] focus-visible:outline-none"
                    id="habit-name-field"
                    name="habit-name"
                    type="text"
                    placeholder=" "
                    onChange={(e) => setHabitName(e.target.value)}
                    value={habitName}
                />
                <label
                    className="absolute bottom-0 py-2 pl-3 text-[#999] duration-100 ease-linear peer-not-placeholder-shown:bottom-10 peer-not-placeholder-shown:p-1 peer-not-placeholder-shown:text-sm peer-focus-visible:bottom-10 peer-focus-visible:p-1 peer-focus-visible:text-sm"
                    htmlFor="habit-name-field"
                >
                    name
                </label>
            </div>
            <div className="relative my-7">
                <label
                    className="duration-100 ease-linear"
                    htmlFor="frequency-field"
                >
                    frequency
                </label>
                <div>
                    <label htmlFor="daily">daily</label>
                    <input
                        type="radio"
                        name="frequency"
                        id="daily"
                        value="daily"
                        checked={habitFrequency === "daily"}
                        onChange={(e) => setHabitFrequency(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="daily">specific</label>
                    <input
                        type="radio"
                        name="frequency"
                        id="specific"
                        value="specific"
                        checked={habitFrequency === "specific"}
                        onChange={(e) => setHabitFrequency(e.target.value)}
                    />
                </div>
            </div>
            <Button label={`${id ? "Update" : "+ Add"} Habit`} />
        </div>
    );
}
