import { Outlet } from "react-router";

export default function BaseLayout() {
    return (
        <main className="m-4 border border-red-600">
            <Outlet />
        </main>
    );
}
