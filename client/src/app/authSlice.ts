import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../types";
import { fetchUserData, loginByEmail } from "./authApi";

interface AuthState {
    user: null | IUser;
    token: null | string;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem("token") ?? null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginByEmail.fulfilled, (state, action) => {
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        });
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
