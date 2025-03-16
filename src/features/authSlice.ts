import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../types";

const initialState: string = "";

const authSlice = createSlice({
    name: "auth_token",
    initialState,
    reducers: {
        setAuthToken: (_state, action: PayloadAction<AuthResponse>) =>
            action.payload.access_token,
    },
});

export const { setAuthToken } = authSlice.actions;
export default authSlice.reducer;
