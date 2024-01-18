import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
    name: 'common',
    initialState: {initialLoad: true, dummyCheckUp: true},
    reducers: {
        toggle(state) {
            state.initialLoad = false;
        },
        toggleDummyChekcup(state) {
            state.dummyCheckUp = false;
        }
    }
});

export const commonActions = commonSlice.actions;
export default commonSlice;