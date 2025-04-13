import { Routes, Route } from "react-router";

import { useRefreshAccount } from "./hooks";
import { BaseLayout, ProtectedLayout } from "./layouts";
import {
    HomePage,
    SignupPage,
    ConfirmationPage,
    LoginPage,
    HabitsPage,
    HabitModPage,
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
                        <Route
                            path="/add-habit"
                            element={<HabitModPage title="Add Habit" />}
                        />
                        <Route
                            path="/edit-habit/:id"
                            element={<HabitModPage title="Edit Habit" />}
                        />
                    </Route>
                </Route>
            </Routes>
        )
    );
}

export default App;
