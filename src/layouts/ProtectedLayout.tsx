import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function ProtectedLayout() {
    const authToken = useSelector((state: RootState) => state.authToken);

    if (!authToken) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}
