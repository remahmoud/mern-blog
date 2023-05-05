import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../lib/instance";
import { IUser, LoginType, RegisterType } from "../types";
import { RootState } from "./store";
import { isAxiosError } from "axios";

export const loginByEmail = createAsyncThunk(
    "users/login",
    async (user: LoginType, { rejectWithValue }) => {
        try {
            const response = await instance.post<{ token: string }>(
                "/auth/login",
                user
            );
            return response.data;
        } catch (error) {
            if (isAxiosError<{ message: string }>(error)) {
                return rejectWithValue(error.response?.data);
            }
            return error;
        }
    }
);
export const registerNewUser = createAsyncThunk(
    "users/register",
    async (user: RegisterType, { rejectWithValue }) => {
        try {
            const response = await instance.post("/auth/register", user);
            return response.data;
        } catch (error) {
            if (isAxiosError<{ message: string }>(error)) {
                return rejectWithValue(error.response?.data);
            }
            return error;
        }
    }
);
export const fetchUserData = createAsyncThunk(
    "users/whoami",
    async (_, api) => {
        const state = api.getState() as RootState;
        const response = await instance.get<IUser>("/auth/whoami", {
            headers: {
                Authorization: state.auth.token,
            },
        });
        return response.data;
    }
);
