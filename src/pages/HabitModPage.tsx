import { NavigateIcon, Header } from "../components";

type HabitModPageTypes = {
    title: string;
};

export default function HabitModPage({ title }: HabitModPageTypes) {
    return (
        <div>
            <NavigateIcon navigateTo="habits" />
            <Header label={title} />
        </div>
    );
}
