import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    isAccountExist: {},
    token: '',
  },
  reducers: {
    setAccountExist: (state, action) => {
      state.isAccountExist = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setAccountExist, setToken } = accountSlice.actions;
export default accountSlice.reducer;
