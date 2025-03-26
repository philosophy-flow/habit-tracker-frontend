import { Button } from "../components";

export default function HomePage() {
    return (
        <>
            <h1 className="m-2 text-center text-xl">Habit Tracker</h1>
            <figure>
                <img className="w-full" src="/home-image.jpg" alt="" />
            </figure>
            <h2 className="m-2 text-center text-xl">Get it together.</h2>
            <div>
                <Button label="Sign Up" />
                <Button label="Login" />
            </div>
        </>
    );
}
