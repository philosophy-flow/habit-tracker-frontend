import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Habit } from "../types";

const initialState: Habit[] = [];

const habitSlice = createSlice({
    name: "habits",
    initialState,
    reducers: {
        setHabits: (_state, action: PayloadAction<Habit[]>) => action.payload,
    },
});

export const { setHabits } = habitSlice.actions;
export default habitSlice.reducer;
