import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/slice";
import commonSlice from "./common/slice";
import departmentSlice from "./department/slice";
import departmentDataSlice from "./department-data/slice";


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        common: commonSlice.reducer,
        department: departmentSlice.reducer,
        departmentData: departmentDataSlice.reducer,
    }
});

export default store;