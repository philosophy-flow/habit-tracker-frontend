import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useDispatch } from "react-redux";

import { setAuthToken, useRefreshAccountMutation } from "./features";
import { BaseLayout, ProtectedLayout } from "./layouts";
import {
    HomePage,
    SignupPage,
    ConfirmationPage,
    LoginPage,
    HabitsPage,
} from "./pages";
import { AuthResponse } from "./types";

function App() {
    const [refreshAccount, { isLoading, isUninitialized }] =
        useRefreshAccountMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        async function refresh() {
            const token: AuthResponse = await refreshAccount().unwrap();
            dispatch(setAuthToken(token));
        }
        refresh();
    }, [refreshAccount, dispatch]);

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
