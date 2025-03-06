import { useEffect } from "react";
import { Routes, Route } from "react-router";

import { BaseLayout, ProtectedLayout } from "./layouts";
import { useAuthenticateAccountMutation, FormState } from "./features";
import {
    HomePage,
    SignupPage,
    ConfirmationPage,
    LoginPage,
    ProtectedPage,
} from "./pages";

function App() {
    const [authenticateAccount, result] = useAuthenticateAccountMutation();

    useEffect(() => {
        const testCreds: FormState = {
            username: "tester",
            password: "safe",
        };

        authenticateAccount(testCreds);
    }, [authenticateAccount]);

    console.log(result);

    return (
        <Routes>
            <Route path="/" element={<BaseLayout />}>
                <Route index element={<HomePage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="confirmation" element={<ConfirmationPage />} />
                <Route path="login" element={<LoginPage />} />

                <Route element={<ProtectedLayout />}>
                    <Route path="/protected" element={<ProtectedPage />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
