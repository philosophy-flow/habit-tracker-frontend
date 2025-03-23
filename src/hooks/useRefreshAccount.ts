import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

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
    const navigate = useNavigate();

    useEffect(() => {
        async function refresh() {
            try {
                const token: AuthResponse = await refreshAccount().unwrap();
                dispatch(setAuthToken(token));
                const user: User = await getCurrentUser().unwrap();
                dispatch(setCurrentUser(user));
            } catch {
                console.log("Unable to authorize account; please login again.");
                navigate("/login");
            }
        }
        refresh();
    }, [refreshAccount, dispatch, getCurrentUser, navigate]);

    return { isLoading, isUninitialized };
}
