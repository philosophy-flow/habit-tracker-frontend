import { Button } from "../components";
import { Link } from "react-router-dom";

export default function HomePage() {
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
                <Link to="/signup">
                    <Button label="Sign Up" />
                </Link>
                <Link to="Login">
                    <Button label="Login" variant="secondary" />
                </Link>
            </div>
        </>
    );
}
