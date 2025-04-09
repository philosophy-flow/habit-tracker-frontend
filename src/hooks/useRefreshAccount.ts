import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
    setAuthToken,
    useRefreshAccountMutation,
    useLazyGetCurrentUserQuery,
    setCurrentUser,
} from "../features";
import { AuthResponse, User } from "../types";

export default function useRefreshAccount() {
    const [refreshAccount, { isLoading, isUninitialized }] =
        useRefreshAccountMutation();
    const [getCurrentUser] = useLazyGetCurrentUserQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        async function refresh() {
            try {
                const token: AuthResponse = await refreshAccount().unwrap();
                dispatch(setAuthToken(token));
                const user: User = await getCurrentUser().unwrap();
                dispatch(setCurrentUser(user));
            } catch {
                console.log(
                    "Unable to authenticate account; please login again.",
                );
            }
        }
        refresh();
    }, [refreshAccount, dispatch, getCurrentUser]);

    return { isLoading, isUninitialized };
}
