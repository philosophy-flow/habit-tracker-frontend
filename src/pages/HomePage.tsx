import { Button } from "../components";
import { useNavigate } from "react-router";

export default function HomePage() {
    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate("/signup");
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <>
            <h1 className="m-2 text-center text-xl">Habit Tracker</h1>
            <figure>
                <img className="w-full" src="/home-image.jpg" alt="" />
            </figure>
            <h2 className="m-2 text-center text-xl">Get it together.</h2>
            <p className="mb-4 text-center">
                Track your habits and goals. Be consistent and build a better
                life.
            </p>
            <div>
                <Button label="Sign Up" onClick={handleSignupClick} />
                <Button
                    label="Login"
                    variant="secondary"
                    onClick={handleLoginClick}
                />
            </div>
        </>
    );
}
