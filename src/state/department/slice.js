import { createSlice } from "@reduxjs/toolkit";

const initialState = {loading: true, departments: []};

const departmentSlice = createSlice({
    name: 'department',
    initialState: initialState,
    reducers: {
        setDepartments(state, action) {
            state.loading = false;
            state.departments = action.payload;
        },
        reset(state) {
            return {loading: true, departments: []};
        }
    }
});

export const DepartmentActions = departmentSlice.actions;
export default departmentSlice;