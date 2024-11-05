import { createSlice } from '@reduxjs/toolkit';
import { fetchCreatePost } from '../Thunks/Post/CreatePostThunk';
import { fetchGlobalPosts } from '../Thunks/Post/GlobalPostsThunk';
import { fetchPostDetails } from '../Thunks/Post/PostDetailsThunk';
import { PostDetailsResponse } from '../../types/Post/PostDetails.Response';
import { GlobalPostResponse } from '../../types/Post/GlobalPost.Response';

interface PostState {
  loading: boolean;
  posts: GlobalPostResponse[];
  postDetails: PostDetailsResponse | undefined;
}

const initialState: PostState = {
  postDetails: undefined,
  loading: false,
  posts: [],
};

export const PostSlice = createSlice({
  name: 'Post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCreatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift({ ...action.payload.result, comments: 0, likes: 0 });
      });

    builder
      .addCase(fetchGlobalPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGlobalPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, ...action.payload.result];
      });

    builder
      .addCase(fetchPostDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.postDetails = action.payload.result;
      });
  },
});

// export const { } = PostSlice.actions;

export default PostSlice.reducer;
