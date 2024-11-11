import { createSlice } from '@reduxjs/toolkit';
import { fetchLogin } from '../Thunks/User/LoginThunk';
import { fetchRegister } from '../Thunks/User/RegisterThunk';

interface UserState {
  token: string,
  loading: boolean,
  error: any
}

const initialState: UserState = {
  token: JSON.parse(localStorage.getItem('nesTwitterToken')!) || '',
  loading: false,
  error: undefined,
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // BUILDER DO THUNK PARA O LOGIN DE USUÁRIO
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        if ('error' in action.payload) {
          state.error = action.payload.message;
          return;
        }
        if (!action.payload.ok) {
          state.error = action.payload.message;
          return;
        }
        localStorage.setItem(
          'nesTwitterToken',
          JSON.stringify(action.payload.result.token),
        );
        state.token = action.payload.result.token;
      });

    // BUILDER DO THUNK PARA REGISTRAR UM NOVO USUÁRIO
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.loading = false;
        if ('error' in action.payload) {
          state.error = action.payload.message;
          return;
        }
        if (!action.payload.ok) {
          state.error = action.payload.message;
          return;
        }
        localStorage.setItem(
          'nesTwitterToken',
          JSON.stringify(action.payload.result.token),
        );
        state.token = action.payload.result.token;
      });
  },
});

// export const { } = UserSlice.actions;

export default UserSlice.reducer;
