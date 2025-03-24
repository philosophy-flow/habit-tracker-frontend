import { Header } from "../components";

export default function ConfirmationPage() {
    return (
        <>
            <Header label="You're In" />
            <p>
                Check your email for a confirmation email to verify your
                account. This should be done within 5 minutes to avoid account
                deletion.
            </p>
        </>
    );
}
