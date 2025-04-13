import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
    setAuthToken,
    useRefreshAccountMutation,
    useLazyGetCurrentUserQuery,
    setCurrentUser,
    useLazyGetHabitsQuery,
    setHabits,
} from "../features";
import { AuthResponse, Habit, User } from "../types";

export default function useRefreshAccount() {
    const [refreshAccount, { isLoading: refreshIsLoading, isUninitialized }] =
        useRefreshAccountMutation();
    const [getCurrentUser, { isLoading: userIsLoading }] =
        useLazyGetCurrentUserQuery();
    const [getHabits, { isLoading: habitIsLoading }] = useLazyGetHabitsQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        async function refresh() {
            try {
                const token: AuthResponse = await refreshAccount().unwrap();
                dispatch(setAuthToken(token));

                const user: User = await getCurrentUser().unwrap();
                dispatch(setCurrentUser(user));

                const habits: Habit[] = await getHabits().unwrap();
                dispatch(setHabits(habits));
            } catch {
                console.error(
                    "Unable to authenticate account; please login again.",
                );
            }
        }
        refresh();
    }, [refreshAccount, dispatch, getCurrentUser, getHabits]);

    const isLoading = refreshIsLoading || userIsLoading || habitIsLoading;
    return { isLoading, isUninitialized };
}
