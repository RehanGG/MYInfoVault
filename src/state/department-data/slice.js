import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const departmentDataSlice = createSlice({
    name: 'departmentData',
    initialState: initialState,
    reducers: {
        setData(state, action) {
            const payload = action.payload;
            state[`${payload.userId}\-${payload.depId}`] = payload.data;
        },
        reset(state) {
            return {};
        }
    }
});

export const DepartmentDataActions = departmentDataSlice.actions;
export default departmentDataSlice;