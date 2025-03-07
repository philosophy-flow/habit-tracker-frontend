import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

const initialState: User = {
    userId: "",
    email: "",
    username: "",
    profileImageUrl: "",
    accountVerified: false,
};

export const userSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setCurrentUser: (_state, action: PayloadAction<User>) => action.payload,
    },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
