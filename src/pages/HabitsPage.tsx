import { useHandleSignout } from "../hooks";
import { Button, Header } from "../components";

export default function HabitsPage() {
    const handleSignout = useHandleSignout();

    return (
        <div className="m-4">
            <Header label="Habits Page (protected)" />
            <Button onClick={handleSignout} label="Sign Out" />
        </div>
    );
}
