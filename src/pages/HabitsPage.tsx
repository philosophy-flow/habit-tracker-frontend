import { useHandleSignout } from "../hooks";
import { Button, Header } from "../components";

export default function HabitsPage() {
    const handleSignout = useHandleSignout();

    return (
        <>
            <Header label="Habits" />
            <div className="my-4">Habits here...</div>
            <Button label="+ Add Habit" variant="dark" />
            <Button onClick={handleSignout} label="Sign Out" />
        </>
    );
}
