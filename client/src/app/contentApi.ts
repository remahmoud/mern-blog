import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../lib/instance";
import { CreatePostType, IPost } from "../types";
import { RootState } from "./store";

export const fetchPosts = createAsyncThunk("posts/fetchAll", async () => {
    const response = await instance.get<IPost[]>("/posts/");
    return response.data;
});
export const fetchPostById = createAsyncThunk(
    "posts/fetchById",
    async (id: string, _) => {
        const response = await instance.get<IPost>("/posts/" + id);
        return response.data;
    }
);
export const fetchPostsByAuthor = createAsyncThunk(
    "posts/fetchByAuthor",
    async (_, { getState }) => {
        const state = getState() as RootState;
        const response = await instance.get<IPost[]>("/posts/me", {
            headers: {
                Authorization: state.auth.token,
            },
        });
        return response.data;
    }
);
export const createNewPost = createAsyncThunk(
    "posts/create",
    async (post: CreatePostType, { getState }) => {
        const state = getState() as RootState;
        const response = await instance.post<IPost>("/posts/", post, {
            headers: {
                Authorization: state.auth.token,
            },
        });
        return response.data;
    }
);
export const deletePost = createAsyncThunk(
    "posts/delete",
    async (id: string, { getState, dispatch }) => {
        const state = getState() as RootState;
        const response = await instance.delete<IPost>("/posts/" + id, {
            headers: {
                Authorization: state.auth.token,
            },
        });
        dispatch(fetchPostsByAuthor());
        return response.data;
    }
);
