import useHandleSignout from "../hooks/useSignoutAccount";
import Button from "../components/Button";
import Header from "../components/Header";

export default function HabitsPage() {
    const handleSignout = useHandleSignout();

    return (
        <div className="m-4">
            <Header label="Habits Page (protected)" />
            <Button onClick={handleSignout} label="Sign Out" />
        </div>
    );
}
