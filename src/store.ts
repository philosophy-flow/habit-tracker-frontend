import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api, userReducer, authReducer, habitReducer } from "./features";

export const store = configureStore({
    reducer: {
        api: api.reducer,
        currentUser: userReducer,
        authToken: authReducer,
        habits: habitReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
