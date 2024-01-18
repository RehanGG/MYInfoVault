import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/slice";
import commonSlice from "./common/slice";


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        common: commonSlice.reducer,
    }
});

export default store;