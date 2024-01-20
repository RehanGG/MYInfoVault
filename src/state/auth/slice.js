import { createSlice } from "@reduxjs/toolkit";


const initialState = {isAuthenticated: false, user: null}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
        updateUser(state, action) {
            state.user.fname = action.payload.fname;
            state.user.imgUrl = action.payload.imgUrl;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;