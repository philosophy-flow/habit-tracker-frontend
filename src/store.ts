import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api, userReducer, authReducer } from "./features";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        currentUser: userReducer,
        authToken: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
