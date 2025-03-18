import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setAuthToken, useRefreshAccountMutation } from "../features";
import { AuthResponse } from "../types";

export default function useRefreshAccount() {
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

    return { isLoading, isUninitialized };
}
