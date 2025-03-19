import { useDispatch } from "react-redux";

import {
    useSignoutAccountMutation,
    setAuthToken,
    setCurrentUser,
} from "../features";

export default function useHandleSignout() {
    const [signout] = useSignoutAccountMutation();
    const dispatch = useDispatch();

    const handleSignout = async () => {
        await signout();

        dispatch(
            setAuthToken({
                access_token: "",
                token_type: "",
            }),
        );
        dispatch(
            setCurrentUser({
                userId: "",
                email: "",
                username: "",
                profileImageUrl: "",
                accountVerified: false,
            }),
        );
    };

    return handleSignout;
}
