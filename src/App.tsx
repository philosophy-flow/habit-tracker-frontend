import { Routes, Route } from "react-router";
import { BaseLayout, ProtectedLayout } from "./layouts";
import {
    HomePage,
    SignupPage,
    ConfirmationPage,
    LoginPage,
    ProtectedPage,
} from "./pages";

function App() {
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
