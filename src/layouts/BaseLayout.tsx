import { Outlet } from "react-router";

export default function BaseLayout() {
    return (
        <main className="flex h-[100dvh] items-center justify-center">
            <div className="border- max-h-[95dvh] w-[100%] max-w-2xl overflow-y-auto rounded border-[#2E2E2E] p-4">
                <Outlet />
            </div>
        </main>
    );
}
