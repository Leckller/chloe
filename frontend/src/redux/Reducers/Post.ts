import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCreatePost } from '../Thunks/Post/CreatePostThunk';
import { fetchGlobalPosts } from '../Thunks/Post/GlobalPostsThunk';
import { fetchPostDetails } from '../Thunks/Post/PostDetailsThunk';
import { PostDetailsResponse } from '../../types/Post/PostDetails.Response';
import { GlobalPostResponse } from '../../types/Post/GlobalPost.Response';

interface PostState {
  loading: boolean;
  posts: GlobalPostResponse[];
  postDetails: PostDetailsResponse | undefined;
  globalPage: number,
  isMaxPage: boolean,
}

const initialState: PostState = {
  postDetails: undefined,
  loading: false,
  posts: [],
  globalPage: 0,
  isMaxPage: false,
};

export const PostSlice = createSlice({
  name: 'Post',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.globalPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // NOVO POST
    builder
      .addCase(fetchCreatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCreatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift({ ...action.payload.result, comments: 0, likes: 0 });
      });

    // POSTS GLOBAIS
    builder
      .addCase(fetchGlobalPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGlobalPosts.fulfilled, (state, action) => {
        state.loading = false;

        // Lógica para evitar que o usuário fique fazendo requisição
        // desnecessária quando o banco de dados não possui mais posts
        if (action.payload.result.length <= 0) {
          state.isMaxPage = true;
          state.globalPage -= 1;
          return;
        }

        state.isMaxPage = false;
        state.posts = [...state.posts, ...action.payload.result];
      })
      .addCase(fetchGlobalPosts.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
      });

    // DETALHES DE UM POST
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

export const { setPage } = PostSlice.actions;

export default PostSlice.reducer;
