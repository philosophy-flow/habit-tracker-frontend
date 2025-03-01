import { Navigate, Outlet } from "react-router";

export default function ProtectedLayout() {
    const isAuthenticated = false;
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}
