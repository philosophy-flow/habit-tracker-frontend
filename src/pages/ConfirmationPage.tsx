import { Link } from "react-router-dom";
import { Button, Header } from "../components";

export default function ConfirmationPage() {
    return (
        <>
            <Header label="You're In" />
            <p className="my-4">
                Check your email for a confirmation email to verify your
                account. This should be done within 5 minutes to avoid account
                deletion.
            </p>
            <Link to="/login">
                <Button label="Login" />
            </Link>
        </>
    );
}
