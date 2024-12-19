import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  emailId: string;
  password: string;
}

const initialState: UserState = {
  emailId: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setUser(state, action: PayloadAction<{ emailId: string; password: string }>) {
    //   state.emailId = action.payload.emailId;
    //   state.password = action.payload.password;
    // },
    setUser(state, action: PayloadAction< string >) {
      state.emailId = action.payload;
    },
    clearUser(state) {
      state.emailId = '';
      state.password = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;