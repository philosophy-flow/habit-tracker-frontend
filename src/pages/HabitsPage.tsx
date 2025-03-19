import { useHandleSignout } from "../hooks";
import { Button, Header } from "../components";

export default function HabitsPage() {
    const handleSignout = useHandleSignout();

    return (
        <div>
            <Header label="Habits" />
            <Button onClick={handleSignout} label="Sign Out" />
        </div>
    );
}
