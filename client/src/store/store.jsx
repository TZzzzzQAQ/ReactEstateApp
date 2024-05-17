import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "@/store/feature/userSlice.jsx";

export const store = configureStore({
    reducer: {
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
});