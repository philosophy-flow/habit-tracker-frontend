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
    DeleteHabitPage,
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
                            path="/habits/inactive"
                            element={<HabitsPage inactive={true} />}
                        />
                        <Route
                            path="/add-habit"
                            element={<HabitModPage title="ADD HABIT" />}
                        />
                        <Route
                            path="/edit-habit/:id"
                            element={<HabitModPage title="EDIT HABIT" />}
                        />
                        <Route
                            path="/edit-habit/:id/delete"
                            element={<DeleteHabitPage />}
                        />
                    </Route>
                </Route>
            </Routes>
        )
    );
}

export default App;
