import { Routes, Route } from "react-router";

import useRefreshAccount from "./hooks/useRefreshAccount";
import { BaseLayout, ProtectedLayout } from "./layouts";
import {
    HomePage,
    SignupPage,
    ConfirmationPage,
    LoginPage,
    HabitsPage,
} from "./pages";

function App() {
    const { isLoading, isUninitialized } = useRefreshAccount();

    return (
        !isUninitialized &&
        !isLoading && (
            <Routes>
                <Route path="/" element={<BaseLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path="confirmation" element={<ConfirmationPage />} />
                    <Route path="login" element={<LoginPage />} />

                    <Route element={<ProtectedLayout />}>
                        <Route path="/habits" element={<HabitsPage />} />
                    </Route>
                </Route>
            </Routes>
        )
    );
}

export default App;
