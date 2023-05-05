import { createSlice } from "@reduxjs/toolkit";
import { fetchPostById, fetchPosts, fetchPostsByAuthor } from "./contentApi";
import type { IPost } from "../types";

interface ContentState {
    posts: null | IPost[];
    post: null | IPost;
}

const initialState: ContentState = {
    posts: null,
    post: null,
};

export const contentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
        });
        builder.addCase(fetchPostById.fulfilled, (state, action) => {
            state.post = action.payload;
        });
        builder.addCase(fetchPostsByAuthor.fulfilled, (state, action) => {
            state.posts = action.payload;
        });
    },
});

export const {} = contentSlice.actions;

export default contentSlice.reducer;
