import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {},
    authStatus: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            console.log(action.payload);
            
            state.authStatus = true;
            state.userData = action.payload
        },
        logout: (state, action) => {
            state.authStatus = false;
            state.userData = {}
        }
    }
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;