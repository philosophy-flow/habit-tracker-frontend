import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import {
    useDeleteHabitMutation,
    useLazyGetHabitsQuery,
    setHabits,
} from "../features";
import { RootState } from "../store";
import { Header, Button } from "../components";

export default function DeleteHabitPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const habits = useSelector((state: RootState) => state.habits);

    const habit = habits.find((h) => h.habit_id === id) || {
        name: "",
        frequency: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    };

    const [deleteHabit] = useDeleteHabitMutation();
    const [getHabits] = useLazyGetHabitsQuery();

    const handleDeleteHabit = async () => {
        await deleteHabit(id!).unwrap();

        const refreshedHabits = await getHabits().unwrap();
        dispatch(setHabits(refreshedHabits));

        navigate("/habits");
    };

    return (
        <div>
            <Header label="DELETE HABIT" />
            <p className="my-4">
                Are you sure you want to delete the habit{" "}
                <span className="font-bold">{habit.name}</span>?
            </p>
            <strong className="my-4 block font-bold">
                This action cannot be undone.
            </strong>
            <div>
                <Button
                    label="Delete Habit"
                    variant="danger"
                    onClick={handleDeleteHabit}
                />
                <Button
                    label="Cancel"
                    variant="dark"
                    onClick={() => navigate(`/edit-habit/${id}`)}
                />
            </div>
        </div>
    );
}
