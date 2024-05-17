import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userReducer from "@/store/feature/userSlice.jsx";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";

const rootReducers = combineReducers({
    user: userReducer
})

const persistConfig = {
    key: "root",
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
});

export const persistor = persistStore(store)