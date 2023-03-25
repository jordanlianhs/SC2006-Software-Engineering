import { configureStore } from "@reduxjs/toolkit";
import { api } from "../features/api/api";
import propertiesSlice from "../features/properties/propertiesSlice";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        properties: propertiesSlice,
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});
