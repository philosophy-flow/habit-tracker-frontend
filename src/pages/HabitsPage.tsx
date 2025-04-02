import { useHandleSignout } from "../hooks";
import { Button, Header } from "../components";
import { useAddHabitMutation } from "../features";

export default function HabitsPage() {
    const handleSignout = useHandleSignout();
    const [addHabit] = useAddHabitMutation();

    const testHabit = "test habit";

    const handleAddHabit = async () => {
        const response = await addHabit(testHabit).unwrap();
        console.log(response);
    };

    return (
        <>
            <Header label="Habits" />
            <div className="my-4">Habits here...</div>
            <Button
                onClick={handleAddHabit}
                label="+ Add Habit"
                variant="dark"
            />
            <Button onClick={handleSignout} label="Sign Out" />
        </>
    );
}
