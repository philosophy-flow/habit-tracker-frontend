import { Button } from "../components";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <>
            <h1 className="font-['Unbounded'] text-2xl">↑Habitsior</h1>
            <p className="mb-7 pl-1 font-['Unbounded'] text-sm leading-normal font-light italic">
                Ever upwards.
            </p>
            <hr className="mb-7 border-2 border-[#2E2E2E]" />
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
