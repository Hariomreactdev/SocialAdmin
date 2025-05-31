import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Http, ApiPath } from '@/apis';

interface StateType {
  token: string | null;
  user: any | null;
}

const initialState: StateType = {
  token: null,
  user: null,
};

// ✅ Use createAsyncThunk to handle async login
export const fetchAuthUser = createAsyncThunk(
  'auth/fetchUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await Http(ApiPath.auth.login, {
        identifier: email,
        password,
        rememberMe: false,
      });
      const data = response.data;
      return data; // Return user data on success
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to login');
    }
  },
);

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SetAuthUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
    },
    DeleteAuthUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthUser.fulfilled, (state, action) => {
      state.user = action.payload.data.user; // Automatically updates state on success
      state.token = action.payload.data.token;
    });
  },
});

export const { SetAuthUser, DeleteAuthUser } = AuthSlice.actions;
export default AuthSlice.reducer;
